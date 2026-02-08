import { AnalysisResult } from '@/types';
import { useEffect, useState } from 'react';
import ReportMap from '../../../components/report-map';
import { MaxWidthWrapper } from '@/components/max-width-wrapper';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { URGENCY } from '@/validators/option-validator';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { postReport } from './actions';

interface AnalysisReportProps {
  analysis: AnalysisResult;
}

const AnalysisReport = ({ analysis }: AnalysisReportProps) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [editedAnalysis, setEditedAnalysis] =
    useState<AnalysisResult>(analysis);

  useEffect(() => {
    setImageUrl(localStorage.getItem('uploaded-image-url')!);
  }, []);

  const { mutate: server_postReport, isPending } = useMutation({
    mutationFn: postReport,
  });

  return (
    <MaxWidthWrapper>
      <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-5 mb-20 pb-20">
        <div className="relative overflow-hidden col-span-3 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-2 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-white h-[26rem] sm:h-[37.5rem]">
          <ReportMap
            lat={editedAnalysis.location?.lat!}
            lng={editedAnalysis.location?.lng!}
          />
        </div>

        <div className="w-full col-span-full lg:col-span-2 flex flex-col bg-white rounded-lg">
          <ScrollArea className="relative flex-1 overflow-auto">
            <div className="px-8 pb-12 pt-8">
              <h2 className="tracking-tight font-semibold text-4xl font-heading">
                Confirm help
              </h2>
              <p className="text-zinc-500 mt-2">
                AI's take on it, but your call!
              </p>

              <div className="w-full h-px bg-zinc-200 my-6" />

              <div className="relative flex flex-col gap-5 w-full">
                <Label>Urgency</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className={cn({
                      'bg-green-100 border-green-200':
                        editedAnalysis.urgency === 'Low',
                      'bg-yellow-100 border-yellow-200':
                        editedAnalysis.urgency === 'Medium',
                      'bg-orange-100 border-orange-200':
                        editedAnalysis.urgency === 'High',
                      'bg-red-100 border-red-200':
                        editedAnalysis.urgency === 'Urgent',
                    })}
                  >
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      <span
                        className={cn('font-semibold', {
                          ' text-red-400': editedAnalysis.urgency === 'Urgent',
                          ' text-orange-400': editedAnalysis.urgency === 'High',
                          ' text-yellow-400':
                            editedAnalysis.urgency === 'Medium',
                          ' text-green-400': editedAnalysis.urgency === 'Low',
                        })}
                      >
                        {
                          URGENCY.options.find(
                            (option) => option.value === editedAnalysis.urgency,
                          )?.label
                        }
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {URGENCY.options.map((option) => (
                      <DropdownMenuItem
                        key={option.label}
                        className={cn(
                          'flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100',
                          {
                            'bg-zinc-100':
                              option.value === editedAnalysis.urgency,
                          },
                        )}
                        onClick={() => {
                          setEditedAnalysis((prev) => ({
                            ...prev,
                            urgency: option.value,
                          }));
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            editedAnalysis.urgency === option.value
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <span>📅 Feb 6, 2026 - 8.00 A.M</span>
                <Label>Description</Label>
                <Textarea
                  value={editedAnalysis.description}
                  className="h-50"
                  onChange={(e) => {
                    setEditedAnalysis((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }));
                  }}
                ></Textarea>
              </div>
            </div>
          </ScrollArea>

          <div className="w-full px-8 h-16 bg-white">
            <div className="w-full h-full flex gap-3 justify-end items-center">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setEditedAnalysis(analysis)}
              >
                Reset
              </Button>
              <Button
                size="sm"
                onClick={() =>
                  server_postReport({ imageUrl, analysis: editedAnalysis })
                }
              >
                Confirm <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default AnalysisReport;
