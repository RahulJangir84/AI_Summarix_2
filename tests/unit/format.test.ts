import { describe, it, expect } from 'vitest';
import { formatPdfNameAsTitle } from '@/utils/format';

describe('formatPdfNameAsTitle', () => {
  it('should remove the file extension and capitalize words', () => {
    expect(formatPdfNameAsTitle('my-document.pdf')).toBe('My Document');
    expect(formatPdfNameAsTitle('academic_paper_2026.pdf')).toBe('Academic Paper 2026');
  });

  it('should split camelCase names correctly', () => {
    expect(formatPdfNameAsTitle('myDocumentName.pdf')).toBe('My Document Name');
    expect(formatPdfNameAsTitle('academicPaper2026.pdf')).toBe('Academic Paper 2026');
  });

  it('should handle mixed separators and multiple spaces gracefully', () => {
    expect(formatPdfNameAsTitle('lecture_notes--final_v2.pdf')).toBe('Lecture Notes Final V2');
    expect(formatPdfNameAsTitle('some-complex_pdf--fileName.pdf')).toBe('Some Complex Pdf File Name');
  });

  it('should trim leading and trailing spaces', () => {
    expect(formatPdfNameAsTitle('  spaced-name  .pdf')).toBe('Spaced Name');
  });
});
