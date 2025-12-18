import { useState } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DownloadButtonProps {
  onDownloadJPEG: () => void;
  onDownloadXLS: () => void;
  disabled?: boolean;
}

export const DownloadButton = ({ onDownloadJPEG, onDownloadXLS, disabled = false }: DownloadButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Circular Download Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-10 h-10 rounded-full
          flex items-center justify-center
          bg-gradient-to-br from-blue-500 to-blue-600 text-white
          hover:from-blue-600 hover:to-blue-700
          shadow-lg hover:shadow-xl
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none
          ${isOpen ? 'rotate-45' : ''}
        `}
        title="Download options"
      >
        <span className="flex items-center justify-center">
          {isOpen ? (
            <X className="w-5 h-5" strokeWidth={2} />
          ) : (
            <Download className="w-5 h-5" strokeWidth={2} />
          )}
        </span>
      </button>

      {/* Download Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-transparent rounded-lg overflow-hidden z-50"
          >
            <div className="py-1 space-y-1">
              <button
                onClick={() => {
                  onDownloadJPEG();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-3 bg-transparent border-0 outline-none focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Download as JPEG</span>
              </button>
              <button
                onClick={() => {
                  onDownloadXLS();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:text-green-600 transition-colors flex items-center gap-3 bg-transparent border-0 outline-none focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download as Excel</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
