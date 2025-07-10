import React from 'react';
import { View, StyleSheet } from 'react-native';

type ProgressBarProps = {
  progress: number;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
};

export default function ProgressBar({
  progress,
  height = 10,
  backgroundColor = '#e0e0e0',
  progressColor = '#3b82f6',
}: ProgressBarProps) {
  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      <View style={[styles.progress, { width: `${Math.min(Math.max(progress, 0), 1) * 100}%`, backgroundColor: progressColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 5,
  },
});
