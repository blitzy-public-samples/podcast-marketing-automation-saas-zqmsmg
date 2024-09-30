import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MobileOverallAnalytics, MobileAnalyticsMetric, MobileAnalyticsDataPoint } from '../../types/analytics';
import AnalyticsChart from './AnalyticsChart';
import { useAnalytics } from '../../hooks/useAnalytics';
import { Button, Loader } from '../common';

const AnalyticsDashboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'year'>('week');
  const { data, loading, error, refetch } = useAnalytics(timeFilter);

  const handleTimeFilterChange = useCallback((newFilter: 'week' | 'month' | 'year') => {
    setTimeFilter(newFilter);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading analytics: {error.message}</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics Dashboard</Text>
        <View style={styles.filterButtons}>
          <Button
            title="Week"
            onPress={() => handleTimeFilterChange('week')}
            style={timeFilter === 'week' ? styles.activeFilter : styles.inactiveFilter}
          />
          <Button
            title="Month"
            onPress={() => handleTimeFilterChange('month')}
            style={timeFilter === 'month' ? styles.activeFilter : styles.inactiveFilter}
          />
          <Button
            title="Year"
            onPress={() => handleTimeFilterChange('year')}
            style={timeFilter === 'year' ? styles.activeFilter : styles.inactiveFilter}
          />
        </View>
      </View>

      <View style={styles.overviewSection}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.metricsContainer}>
          {renderMetricCard(data.totalListens, 'Total Listens')}
          {renderMetricCard(data.averageListenTime, 'Avg. Listen Time')}
          {renderMetricCard(data.uniqueListeners, 'Unique Listeners')}
        </View>
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Listening Trends</Text>
        <AnalyticsChart data={data.listeningTrends} />
      </View>

      <View style={styles.mobileSection}>
        <Text style={styles.sectionTitle}>Mobile Metrics</Text>
        <View style={styles.metricsContainer}>
          {renderMetricCard(data.appOpens, 'App Opens')}
          {renderMetricCard(data.averageSessionDuration, 'Avg. Session Duration')}
          {renderMetricCard(data.mobileDownloads, 'Mobile Downloads')}
        </View>
      </View>

      <View style={styles.topPerformersSection}>
        <Text style={styles.sectionTitle}>Top Performing Podcasts</Text>
        {data.topPodcasts.map((podcast, index) => (
          <View key={index} style={styles.topPerformerItem}>
            <Text style={styles.topPerformerTitle}>{podcast.title}</Text>
            <Text style={styles.topPerformerMetric}>{podcast.listens} listens</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const renderMetricCard = (metric: MobileAnalyticsMetric, label: string) => (
  <View style={styles.metricCard}>
    <Text style={styles.metricValue}>{formatMetricValue(metric)}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

const formatMetricValue = (metric: MobileAnalyticsMetric): string => {
  if (typeof metric === 'number') {
    return metric.toLocaleString();
  }
  return metric.toString();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
  },
  inactiveFilter: {
    backgroundColor: '#E0E0E0',
  },
  overviewSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCard: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666666',
  },
  chartSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 16,
  },
  mobileSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 16,
  },
  topPerformersSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 16,
  },
  topPerformerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  topPerformerTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  topPerformerMetric: {
    fontSize: 14,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default AnalyticsDashboard;