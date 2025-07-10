import React, { useState } from 'react';
import { View } from 'react-native';
import TimerCard from './TimerCard';
import CategoryHeader from './CategoryHeader';

type CategoryGroupProps = {
  category: string;
  timers: Array<any>;
  onBulkAction: (category: string, actionType: string) => void;
};

export default function CategoryGroup({ category, timers, onBulkAction }: CategoryGroupProps) {
  const [expanded, setExpanded] = useState(true);   
  return (
    <View style={{ marginBottom: 20 }}>
      <CategoryHeader
        category={category}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        onStartAll={() => onBulkAction(category, 'START_TIMER')}
        onPauseAll={() => onBulkAction(category, 'PAUSE_TIMER')}
        onResetAll={() => onBulkAction(category, 'RESET_TIMER')}
      />

      {expanded &&
        timers.map(timer => (
          <TimerCard key={timer.id} timer={timer} />
        ))
      }
    </View>
  );
}
