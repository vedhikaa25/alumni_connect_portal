import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AchievementsSection = ({ achievements, onChange }) => {
  const [newAchievement, setNewAchievement] = useState({ title: '', description: '', year: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddAchievement = () => {
    if (newAchievement?.title?.trim() && newAchievement?.description?.trim()) {
      const achievement = {
        id: Date.now(),
        ...newAchievement,
        year: newAchievement?.year || new Date()?.getFullYear()?.toString()
      };
      onChange([...achievements, achievement]);
      setNewAchievement({ title: '', description: '', year: '' });
      setIsAdding(false);
    }
  };

  const handleRemoveAchievement = (id) => {
    onChange(achievements?.filter(achievement => achievement?.id !== id));
  };

  const currentYear = new Date()?.getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= 1950; year--) {
    yearOptions?.push({ value: year?.toString(), label: year?.toString() });
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-heading-md text-foreground">
          Achievements & Awards
        </h3>
        <Button
          variant="outline"
          onClick={() => setIsAdding(true)}
          iconName="Plus"
          iconPosition="left"
          disabled={isAdding}
        >
          Add Achievement
        </Button>
      </div>
      {/* Add New Achievement Form */}
      {isAdding && (
        <div className="bg-muted rounded-lg p-4 mb-6">
          <h4 className="font-body font-medium text-body-md text-foreground mb-4">
            Add New Achievement
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Achievement Title"
              type="text"
              placeholder="e.g., Employee of the Year"
              value={newAchievement?.title}
              onChange={(e) => setNewAchievement({ ...newAchievement, title: e?.target?.value })}
              required
            />
            <Input
              label="Year"
              type="number"
              placeholder="2024"
              value={newAchievement?.year}
              onChange={(e) => setNewAchievement({ ...newAchievement, year: e?.target?.value })}
              min="1950"
              max={currentYear?.toString()}
            />
          </div>
          <div className="mb-4">
            <label className="block font-body font-medium text-body-sm text-foreground mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe your achievement and its impact..."
              value={newAchievement?.description}
              onChange={(e) => setNewAchievement({ ...newAchievement, description: e?.target?.value })}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="default"
              onClick={handleAddAchievement}
              iconName="Check"
              iconPosition="left"
            >
              Add Achievement
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsAdding(false);
                setNewAchievement({ title: '', description: '', year: '' });
              }}
              iconName="X"
              iconPosition="left"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* Achievements List */}
      <div className="space-y-4">
        {achievements?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Award" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-body-md text-muted-foreground mb-2">No achievements added yet</p>
            <p className="text-body-sm text-muted-foreground">
              Showcase your professional accomplishments and awards
            </p>
          </div>
        ) : (
          achievements?.map((achievement) => (
            <div key={achievement?.id} className="bg-muted rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Award" size={20} className="text-accent" />
                    <h4 className="font-body font-medium text-body-md text-foreground">
                      {achievement?.title}
                    </h4>
                    {achievement?.year && (
                      <span className="text-body-sm text-muted-foreground">
                        ({achievement?.year})
                      </span>
                    )}
                  </div>
                  <p className="text-body-sm text-muted-foreground">
                    {achievement?.description}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveAchievement(achievement?.id)}
                  className="p-1 text-muted-foreground hover:text-error transition-smooth"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AchievementsSection;