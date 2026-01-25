'use client';

import { useState } from 'react';

interface AnalysisResult {
  animalType: string;
  animalCount: number;
  visibleIssues: string[];
  environment: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Urgent';
  description: string;
  fileName?: string;
  fileSize?: number;
  timestamp?: string;
}

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setAnalysis(null);
    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Submit to Gemini
  const handleAnalyze = async () => {
    if (!image) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setImage(null);
    setPreview('');
    setAnalysis(null);
    setError('');
  };

  return (
    <div>
      <h1>Stray Animal Image Analyzer</h1>

      {/* Image Upload */}
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          disabled={loading}
        />
      </div>

      {/* Preview */}
      {preview && (
        <div>
          <h2>Preview:</h2>
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
        </div>
      )}

      {/* Buttons */}
      <div>
        <button onClick={handleAnalyze} disabled={!image || loading}>
          {loading ? 'Analyzing...' : 'Analyze with Gemini AI'}
        </button>

        <button onClick={handleReset} disabled={loading}>
          Reset
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{ color: 'red' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Results */}
      {analysis && (
        <div>
          <h2>Analysis Results:</h2>

          <div>
            <strong>Animal Type:</strong> {analysis.animalType}
          </div>

          <div>
            <strong>Count:</strong> {analysis.animalCount}
          </div>

          <div>
            <strong>Urgency:</strong>
            <span
              style={{
                color:
                  analysis.urgency === 'Urgent'
                    ? 'red'
                    : analysis.urgency === 'High'
                      ? 'orange'
                      : analysis.urgency === 'Medium'
                        ? 'blue'
                        : 'green',
              }}
            >
              {analysis.urgency}
            </span>
          </div>

          <div>
            <strong>Environment:</strong> {analysis.environment}
          </div>

          <div>
            <strong>Visible Issues:</strong>
            <ul>
              {analysis.visibleIssues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Description:</strong> {analysis.description}
          </div>

          <div>
            <strong>Analysis Time:</strong> {analysis.timestamp}
          </div>
        </div>
      )}
    </div>
  );
}
