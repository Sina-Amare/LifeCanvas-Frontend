import React from 'react';

const JournalList = ({ journals }) => {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Journals</h2>
      {journals.length === 0 ? (
        <p className="text-center text-gray-500">
          No journals yet. Create one above!
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {journals.map((journal) => (
            <div key={journal.id} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{journal.title}</h3>
              <p className="text-gray-600 mt-1">{journal.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Mood:{' '}
                <span className="capitalize">
                  {journal.mood || 'Not analyzed'}
                </span>
              </p>
              {journal.location && (
                <p className="text-sm text-gray-500">
                  Location: {journal.location}
                </p>
              )}
              {journal.labels.length > 0 && (
                <p className="text-sm text-gray-500">
                  Labels: {journal.labels.join(', ')}
                </p>
              )}
              <p className="text-sm text-gray-400 mt-2">
                Created at: {new Date(journal.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalList;
