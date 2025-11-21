import React from "react";

interface UpdatePromptProps {
  show: boolean;
  onUpdate: () => void;
  onCancel?: () => void;
  isUpdating?: boolean;
}

const UpdatePrompt: React.FC<UpdatePromptProps> = ({
  show,
  onUpdate,
  onCancel,
  isUpdating = false,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          {isUpdating ? "Ενημέρωση..." : "Νέα Εκδοση Διαθέσιμη!"}
        </h2>
        <p className="mb-6">
          {isUpdating
            ? "Η εφαρμογή ενημερώνεται..."
            : "Μια νέα έκδοση της εφαρμογής είναι διαθέσιμη. Θέλετε να ενημερώσετε τώρα;"}
        </p>
        <div className="flex gap-3 justify-end">
          {!isUpdating && onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Αργότερα
            </button>
          )}
          <button
            onClick={onUpdate}
            disabled={isUpdating}
            className={`px-4 py-2 text-white rounded transition-colors ${
              isUpdating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isUpdating ? "Ενημέρωση..." : "Ενημέρωση Τώρα"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePrompt;
