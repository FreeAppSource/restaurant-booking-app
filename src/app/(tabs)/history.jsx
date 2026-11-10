import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { bookingHistory } from '../../data';
import BookingModal from '../../components/BookingModal';

export default function HistoryScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState('All');
  const [bookingModalVisible, setBookingModalVisible] = useState(false);

  const filteredBookings = bookingHistory.filter((item) => {
    if (activeTab === 'Active') return item.status === 'Active' || item.status === 'Confirmed';
    if (activeTab === 'Completed') return item.status === 'Completed';
    return true;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* Top Header */}
      <View style={[styles.topBar, { backgroundColor: theme.surface }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Booking History</Text>
      </View>

      {/* Tabs Row */}
      <View style={[styles.tabsRow, { backgroundColor: theme.surface }]}>
        {['All', 'Active', 'Completed'].map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabBtn,
                isSelected && { borderBottomColor: colors.primary, borderBottomWidth: 3 },
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: isSelected ? colors.primaryDark : theme.subText, fontWeight: isSelected ? '800' : '600' },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredBookings.map((bk) => (
          <View
            key={bk.id}
            style={[styles.bookingCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}
          >
            <View style={styles.cardTop}>
              <Image
                source={require('../../assets/images/rest_ambrosia.png')}
                style={styles.restThumb}
              />
              <View style={styles.topInfo}>
                <View style={styles.statusRow}>
                  <Text style={[styles.bookingId, { color: theme.subText }]}>{bk.bookingId}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: colors.primarySoft }]}>
                    <Text style={[styles.statusBadgeText, { color: colors.primaryDark }]}>{bk.status}</Text>
                  </View>
                </View>
                <Text style={[styles.restName, { color: theme.text }]} numberOfLines={1}>
                  {bk.restaurantName}
                </Text>
                <Text style={[styles.restAddress, { color: theme.subText }]} numberOfLines={1}>
                  {bk.restaurantAddress}
                </Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: theme.divider }]} />

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={14} color={colors.primary} />
                <Text style={[styles.detailItemText, { color: theme.text }]}>{bk.date}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={14} color={colors.primary} />
                <Text style={[styles.detailItemText, { color: theme.text }]}>{bk.time}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="people-outline" size={14} color={colors.primary} />
                <Text style={[styles.detailItemText, { color: theme.text }]}>{bk.guests}</Text>
              </View>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity
                style={[styles.checkBtn, { borderColor: colors.primary }]}
                onPress={() => Alert.alert(bk.bookingId, `Reservation at ${bk.restaurantName} for ${bk.guests} on ${bk.date} at ${bk.time}.`)}
              >
                <Text style={[styles.checkBtnText, { color: colors.primaryDark }]}>Check Details</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.rebookBtn, { backgroundColor: colors.primary }]}
                onPress={() => setBookingModalVisible(true)}
              >
                <Text style={styles.rebookBtnText}>Book Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Booking More Button (Sketch: Booking more) */}
        <TouchableOpacity
          style={[styles.bookingMoreBtn, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/(tabs)')}
          activeOpacity={0.85}
        >
          <Ionicons name="add-circle-outline" size={20} color="#FFFFFF" />
          <Text style={styles.bookingMoreText}>Booking more</Text>
        </TouchableOpacity>
      </ScrollView>

      <BookingModal
        visible={bookingModalVisible}
        onClose={() => setBookingModalVisible(false)}
        restaurant={{ name: 'Ambrosia Hotel & Restaurant' }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 20, paddingVertical: 12 },
  headerTitle: { fontSize: 22, fontWeight: '900' },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tabBtn: { paddingVertical: 10, marginRight: 24 },
  tabText: { fontSize: 13 },
  scrollContent: { padding: 16, gap: 14 },
  bookingCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
  },
  cardTop: { flexDirection: 'row', gap: 12 },
  restThumb: { width: 68, height: 68, borderRadius: 12 },
  topInfo: { flex: 1, justifyContent: 'space-between' },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bookingId: { fontSize: 11, fontWeight: '700' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  statusBadgeText: { fontSize: 10, fontWeight: '800' },
  restName: { fontSize: 15, fontWeight: '800' },
  restAddress: { fontSize: 11 },
  divider: { height: 1, marginVertical: 12 },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  detailItemText: { fontSize: 12, fontWeight: '600' },
  cardActions: { flexDirection: 'row', gap: 10 },
  checkBtn: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBtnText: { fontSize: 12, fontWeight: '800' },
  rebookBtn: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rebookBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  bookingMoreBtn: {
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  bookingMoreText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
});
