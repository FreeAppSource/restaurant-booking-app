import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';

export default function BookingModal({ visible, onClose, restaurant }) {
  const router = useRouter();
  const { theme } = useTheme();

  const [selectedDate, setSelectedDate] = useState('Today, 08 Nov');
  const [selectedTime, setSelectedTime] = useState('08:00 PM');
  const [guestsCount, setGuestsCount] = useState(3);
  const [seatingPreference, setSeatingPreference] = useState('VIP Terrace Booth');

  const dates = ['Today, 08 Nov', 'Tomorrow, 09 Nov', 'Mon, 10 Nov', 'Tue, 11 Nov'];
  const times = ['01:00 PM', '02:30 PM', '06:30 PM', '08:00 PM', '09:30 PM'];
  const seatings = ['Indoor Main Hall', 'VIP Terrace Booth', 'Outdoor Garden', 'Private Dining'];

  const handleConfirmReservation = () => {
    onClose();
    router.push({
      pathname: '/booking-confirmation',
      params: {
        restaurantName: restaurant?.name || 'Ambrosia Hotel & Restaurant',
        date: selectedDate,
        time: selectedTime,
        guests: `${guestsCount} Guests`,
        seating: seatingPreference,
      },
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />

        <View style={[styles.sheetContent, { backgroundColor: theme.surface }]}>
          <View style={styles.dragBar} />

          <View style={styles.sheetHeader}>
            <View>
              <Text style={[styles.sheetTitle, { color: theme.text }]}>Book a Table</Text>
              <Text style={[styles.sheetSub, { color: theme.subText }]}>{restaurant?.name || 'Ambrosia Hotel'}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={theme.subText} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Date Selector */}
            <Text style={[styles.sectionHeading, { color: theme.text }]}>Select Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalChips}>
              {dates.map((d) => {
                const isSelected = selectedDate === d;
                return (
                  <TouchableOpacity
                    key={d}
                    style={[
                      styles.chip,
                      { backgroundColor: isSelected ? colors.primary : theme.inputBg },
                    ]}
                    onPress={() => setSelectedDate(d)}
                  >
                    <Text style={[styles.chipText, { color: isSelected ? '#FFFFFF' : theme.text }]}>{d}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Time Slot */}
            <Text style={[styles.sectionHeading, { color: theme.text }]}>Select Time Slot</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalChips}>
              {times.map((t) => {
                const isSelected = selectedTime === t;
                return (
                  <TouchableOpacity
                    key={t}
                    style={[
                      styles.chip,
                      { backgroundColor: isSelected ? colors.primary : theme.inputBg },
                    ]}
                    onPress={() => setSelectedTime(t)}
                  >
                    <Text style={[styles.chipText, { color: isSelected ? '#FFFFFF' : theme.text }]}>{t}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Guests Counter */}
            <Text style={[styles.sectionHeading, { color: theme.text }]}>Number of Guests</Text>
            <View style={[styles.counterRow, { backgroundColor: theme.inputBg }]}>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setGuestsCount(Math.max(1, guestsCount - 1))}
              >
                <Ionicons name="remove" size={20} color={theme.text} />
              </TouchableOpacity>
              <Text style={[styles.counterValue, { color: theme.text }]}>{guestsCount} Guests</Text>
              <TouchableOpacity
                style={styles.counterBtn}
                onPress={() => setGuestsCount(Math.min(12, guestsCount + 1))}
              >
                <Ionicons name="add" size={20} color={theme.text} />
              </TouchableOpacity>
            </View>

            {/* Seating Preference */}
            <Text style={[styles.sectionHeading, { color: theme.text }]}>Seating Area</Text>
            <View style={styles.seatingList}>
              {seatings.map((s) => {
                const isSelected = seatingPreference === s;
                return (
                  <TouchableOpacity
                    key={s}
                    style={[
                      styles.seatingItem,
                      { backgroundColor: isSelected ? colors.primarySoft : theme.inputBg },
                      isSelected && { borderColor: colors.primary, borderWidth: 1.5 },
                    ]}
                    onPress={() => setSeatingPreference(s)}
                  >
                    <Ionicons
                      name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                      size={18}
                      color={isSelected ? colors.primary : theme.subText}
                    />
                    <Text style={[styles.seatingText, { color: isSelected ? colors.primaryDark : theme.text }]}>
                      {s}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={{ height: 16 }} />
          </ScrollView>

          {/* Confirm Button */}
          <TouchableOpacity
            style={[styles.confirmBtn, { backgroundColor: colors.primary }]}
            onPress={handleConfirmReservation}
            activeOpacity={0.85}
          >
            <Ionicons name="calendar-outline" size={20} color="#FFFFFF" />
            <Text style={styles.confirmBtnText}>Confirm Reservation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  backdrop: { flex: 1 },
  sheetContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    maxHeight: '85%',
  },
  dragBar: {
    width: 44,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#CCCCCC',
    alignSelf: 'center',
    marginBottom: 14,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sheetTitle: { fontSize: 18, fontWeight: '800' },
  sheetSub: { fontSize: 12, marginTop: 2 },
  closeBtn: { padding: 4 },
  sectionHeading: { fontSize: 13, fontWeight: '800', marginTop: 14, marginBottom: 8 },
  horizontalChips: { gap: 8, paddingBottom: 4 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
  },
  chipText: { fontSize: 12, fontWeight: '700' },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  counterBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  counterValue: { fontSize: 15, fontWeight: '800' },
  seatingList: { gap: 8 },
  seatingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },
  seatingText: { fontSize: 13, fontWeight: '700' },
  confirmBtn: {
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 14,
  },
  confirmBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
});
