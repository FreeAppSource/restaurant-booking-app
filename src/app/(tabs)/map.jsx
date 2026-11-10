import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { restaurantsData } from '../../data';
import BookingModal from '../../components/BookingModal';

export default function MapScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [activeRestaurantIndex, setActiveRestaurantIndex] = useState(0);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);

  const activeRest = restaurantsData[activeRestaurantIndex];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#E5E7EB' }]} edges={['top']}>
      {/* Map Graphic Background */}
      <Image
        source={require('../../assets/images/map_chittagong.png')}
        style={styles.mapBg}
        resizeMode="cover"
      />

      {/* Floating Top Search Bar */}
      <View style={styles.topSearchWrapper}>
        <View style={[styles.searchBox, { backgroundColor: '#FFFFFF' }]}>
          <Ionicons name="search" size={18} color={theme.subText} />
          <TextInput
            placeholder="Search restaurant on map..."
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
          <TouchableOpacity style={[styles.filterBtn, { backgroundColor: colors.primary }]}>
            <Ionicons name="options-outline" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Pins */}
      <View style={[styles.pinWrapper, { top: '35%', left: '42%' }]}>
        <TouchableOpacity
          style={[styles.pinCircle, activeRestaurantIndex === 0 && styles.pinActive]}
          onPress={() => setActiveRestaurantIndex(0)}
        >
          <Ionicons name="restaurant" size={16} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.pinLabel}>
          <Text style={styles.pinLabelText}>Ambrosia</Text>
        </View>
      </View>

      <View style={[styles.pinWrapper, { top: '48%', left: '68%' }]}>
        <TouchableOpacity
          style={[styles.pinCircle, activeRestaurantIndex === 1 && styles.pinActive]}
          onPress={() => setActiveRestaurantIndex(1)}
        >
          <Ionicons name="restaurant" size={16} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.pinLabel}>
          <Text style={styles.pinLabelText}>Tava</Text>
        </View>
      </View>

      <View style={[styles.pinWrapper, { top: '56%', left: '22%' }]}>
        <TouchableOpacity
          style={[styles.pinCircle, activeRestaurantIndex === 2 && styles.pinActive]}
          onPress={() => setActiveRestaurantIndex(2)}
        >
          <Ionicons name="restaurant" size={16} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.pinLabel}>
          <Text style={styles.pinLabelText}>Haatkhola</Text>
        </View>
      </View>

      {/* Floating Bottom Card Preview (Sketch: Map artboard) */}
      <View style={styles.bottomCardWrapper}>
        <TouchableOpacity
          style={[styles.floatingCard, { backgroundColor: theme.surface }]}
          onPress={() => router.push({ pathname: '/details', params: { restaurantId: activeRest.id } })}
          activeOpacity={0.9}
        >
          <Image
            source={require('../../assets/images/rest_ambrosia.png')}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>
              {activeRest.name}
            </Text>
            <View style={styles.cardAddressRow}>
              <Ionicons name="location-outline" size={13} color={theme.subText} />
              <Text style={[styles.cardAddress, { color: theme.subText }]} numberOfLines={1}>
                {activeRest.address}
              </Text>
            </View>

            <View style={styles.cardBottomRow}>
              <View style={styles.ratingBox}>
                <Ionicons name="star" size={12} color="#FFC107" />
                <Text style={[styles.ratingVal, { color: theme.text }]}>{activeRest.rating}</Text>
                <Text style={[styles.distanceVal, { color: colors.primary }]}>({activeRest.distance})</Text>
              </View>

              <TouchableOpacity
                style={[styles.bookBtn, { backgroundColor: colors.primary }]}
                onPress={() => setBookingModalVisible(true)}
              >
                <Text style={styles.bookBtnText}>Book Table</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <BookingModal
        visible={bookingModalVisible}
        onClose={() => setBookingModalVisible(false)}
        restaurant={activeRest}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
  mapBg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  topSearchWrapper: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  searchInput: { flex: 1, fontSize: 14, marginLeft: 8 },
  filterBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  pinCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  pinActive: {
    backgroundColor: colors.primary,
    transform: [{ scale: 1.15 }],
  },
  pinLabel: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  pinLabelText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
  bottomCardWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  floatingCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 18,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    gap: 12,
  },
  cardImage: { width: 80, height: 80, borderRadius: 12 },
  cardContent: { flex: 1, justifyContent: 'space-between' },
  cardTitle: { fontSize: 14, fontWeight: '800' },
  cardAddressRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardAddress: { fontSize: 11, flex: 1 },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
  ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingVal: { fontSize: 12, fontWeight: '800' },
  distanceVal: { fontSize: 11, fontWeight: '700' },
  bookBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  bookBtnText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
});
