'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { generateApiKey, getApiKey } from './actions';
import ConfirmationModal from '@/components/confirmation-modal';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Eye, EyeOff, Copy, Check, Key, Shield } from 'lucide-react';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

const ApiKeys = () => {
  const queryClient = useQueryClient();
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const { data } = useQuery({
    queryKey: ['api-keys'],
    queryFn: getApiKey,
  });

  const { mutateAsync: generateNewApiKey } = useMutation({
    mutationKey: ['generate-api-key'],
    mutationFn: generateApiKey,
    onSuccess: () => {
      // Invalidate the query to refetch the new API key
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
    },
  });

  const maskKey = useCallback((key: string) => {
    if (!key || key.length <= 8) return '•'.repeat(32);
    return key.slice(0, 4) + '•'.repeat(Math.max(key.length - 8, 24)) + key.slice(-4);
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(data);
      setIsCopied(true);
      toast.success('API key copied to clipboard');
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error('Failed to copy API key');
    }
  }, [data]);

  return (
    <div className="w-full max-w-2xl">
      {/* Key display card */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {/* Card header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-brand-50/80 to-white">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-100/80">
            <Key className="w-4.5 h-4.5 text-brand-700" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Your API Key</h3>
            <p className="text-xs text-gray-500">Use this key to authenticate API requests</p>
          </div>
        </div>

        {/* Key value section */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-2">
            {/* Key display */}
            <div className="flex-1 relative">
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 font-mono text-sm text-gray-800 tracking-wide select-all transition-all duration-200">
                <span className="truncate">
                  {data ? (isVisible ? data : maskKey(data)) : '•'.repeat(32)}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5">
              {/* Toggle visibility */}
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => setIsVisible((v) => !v)}
                className="text-gray-500 hover:text-brand-700 hover:border-brand-200 hover:bg-brand-50 transition-all duration-200"
                title={isVisible ? 'Hide API key' : 'Show API key'}
              >
                {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>

              {/* Copy to clipboard */}
              <Button
                variant="outline"
                size="icon-sm"
                onClick={copyToClipboard}
                disabled={!data}
                className={`transition-all duration-200 ${
                  isCopied
                    ? 'text-emerald-600 border-emerald-200 bg-emerald-50'
                    : 'text-gray-500 hover:text-brand-700 hover:border-brand-200 hover:bg-brand-50'
                }`}
                title="Copy API key"
              >
                {isCopied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>

              {/* Regenerate key */}
              <ConfirmationModal
                title="Generate New API Key"
                description="Are you sure you want to generate a new API key? This will invalidate your current key."
                onConfirm={() => generateNewApiKey()}
              >
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="text-gray-500 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50 transition-all duration-200"
                  title="Regenerate API key"
                >
                  <RefreshCcw className="w-4 h-4" />
                </Button>
              </ConfirmationModal>
            </div>
          </div>
        </div>

        {/* Card footer / hint */}
        <div className="flex items-center gap-2 px-5 py-3 bg-gray-50/60 border-t border-gray-100">
          <Shield className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <p className="text-xs text-gray-500">
            Keep your key secure. Regenerating will invalidate all existing integrations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;
