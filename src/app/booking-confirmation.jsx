import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, radius, useTheme } from '../theme';

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const params = useLocalSearchParams();

  const bookingCode = 'BK-' + Math.floor(10000 + Math.random() * 90000);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={[styles.successIconCircle, { backgroundColor: colors.primarySoft }]}>
          <Ionicons name="checkmark-circle" size={64} color={colors.primary} />
        </View>

        <Text style={[styles.heading, { color: theme.text }]}>Table Booked!</Text>
        <Text style={[styles.subText, { color: theme.subText }]}>
          Your table reservation has been confirmed with the restaurant.
        </Text>

        {/* Receipt Card */}
        <View style={[styles.receiptCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
          <View style={styles.codeRow}>
            <Text style={[styles.codeLabel, { color: theme.subText }]}>RESERVATION CODE</Text>
            <Text style={[styles.codeValue, { color: colors.primary }]}>{bookingCode}</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.divider }]} />

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.subText }]}>Restaurant</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {params.restaurantName || 'Ambrosia Hotel & Restaurant'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.subText }]}>Date & Time</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {params.date || 'Today, 08 Nov'} at {params.time || '08:00 PM'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.subText }]}>Party Size</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {params.guests || '3 Guests'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.subText }]}>Seating Area</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {params.seating || 'VIP Terrace Booth'}
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionColumn}>
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.replace('/(tabs)/history')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>View in My Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryBtn, { backgroundColor: theme.inputBg }]}
            onPress={() => router.replace('/(tabs)')}
            activeOpacity={0.85}
          >
            <Text style={[styles.secondaryBtnText, { color: theme.text }]}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: { fontSize: 26, fontWeight: '900', marginBottom: 8 },
  subText: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 24, paddingHorizontal: 12 },
  receiptCard: {
    width: '100%',
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 28,
  },
  codeRow: { alignItems: 'center', paddingBottom: 12 },
  codeLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  codeValue: { fontSize: 24, fontWeight: '900', marginTop: 4 },
  divider: { height: 1, width: '100%', marginBottom: 12 },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  detailLabel: { fontSize: 13, fontWeight: '600' },
  detailValue: { fontSize: 13, fontWeight: '800' },
  actionColumn: { width: '100%', gap: 10 },
  primaryBtn: {
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  secondaryBtn: {
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryBtnText: { fontSize: 15, fontWeight: '800' },
});
