import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { restaurantsData, dishesData } from '../data';
import DishCard from '../components/DishCard';
import BookingModal from '../components/BookingModal';

export default function DetailsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const params = useLocalSearchParams();

  const restaurant = restaurantsData.find((r) => r.id === params.restaurantId) || restaurantsData[0];
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState('All');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top', 'bottom']}>
      {/* Top Header */}
      <View style={[styles.topHeader, { backgroundColor: theme.surface }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]} numberOfLines={1}>
          {restaurant.name}
        </Text>
        <TouchableOpacity style={styles.backBtn}>
          <Ionicons name="heart-outline" size={22} color={colors.accentRed} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Photo (Sketch: Haatkhola / Ambrosia) */}
        <View style={styles.heroBox}>
          <Image
            source={require('../assets/images/rest_haatkhola.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.ratingPill}>
            <Ionicons name="star" size={14} color="#FFC107" />
            <Text style={styles.ratingPillText}>{restaurant.rating} ({restaurant.reviews})</Text>
          </View>
        </View>

        {/* Restaurant Info Card */}
        <View style={[styles.infoCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.restaurantName, { color: theme.text }]}>{restaurant.name}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color={colors.primary} />
            <Text style={[styles.addressText, { color: theme.subText }]}>{restaurant.address}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={16} color={colors.primary} />
            <Text style={[styles.openStatusText, { color: colors.primaryDark }]}>{restaurant.openStatus}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={16} color={colors.primary} />
            <Text style={[styles.phoneText, { color: theme.text }]}>{restaurant.phone}</Text>
          </View>
        </View>

        {/* Menu Highlights (Check the menu at this restaurant) */}
        <View style={styles.menuSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Menu Highlights</Text>
            <Text style={[styles.sectionSub, { color: theme.subText }]}>Check the menu at this restaurant</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.menuRow}>
            {dishesData.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onOrderPress={() => setBookingModalVisible(true)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Other Recommended Restaurants */}
        <View style={styles.otherSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>List other restaurant</Text>
          </View>

          {restaurantsData.filter((r) => r.id !== restaurant.id).map((otherRest) => (
            <TouchableOpacity
              key={otherRest.id}
              style={[styles.otherCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}
              onPress={() => router.push({ pathname: '/details', params: { restaurantId: otherRest.id } })}
            >
              <Image
                source={require('../assets/images/rest_tava.png')}
                style={styles.otherThumb}
              />
              <View style={styles.otherMeta}>
                <Text style={[styles.otherName, { color: theme.text }]}>{otherRest.name}</Text>
                <Text style={[styles.otherAddr, { color: theme.subText }]}>{otherRest.address}</Text>
                <Text style={[styles.otherRating, { color: colors.primaryDark }]}>{otherRest.rating} ★ ({otherRest.distance})</Text>
              </View>
              <View style={[styles.checkPill, { backgroundColor: colors.primarySoft }]}>
                <Text style={[styles.checkPillText, { color: colors.primaryDark }]}>Check</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Fixed Bottom Booking Bar */}
      <View style={[styles.bottomBar, { backgroundColor: theme.surface, borderTopColor: theme.divider }]}>
        <View>
          <Text style={[styles.tableAvailability, { color: colors.primaryDark }]}>
            ● {restaurant.tablesAvailable} Tables Available
          </Text>
          <Text style={[styles.priceTag, { color: theme.text }]}>Instant Reservation</Text>
        </View>

        <TouchableOpacity
          style={[styles.bookTableBtn, { backgroundColor: colors.primary }]}
          onPress={() => setBookingModalVisible(true)}
          activeOpacity={0.85}
        >
          <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
          <Text style={styles.bookTableText}>Book a Table</Text>
        </TouchableOpacity>
      </View>

      <BookingModal
        visible={bookingModalVisible}
        onClose={() => setBookingModalVisible(false)}
        restaurant={restaurant}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 16, fontWeight: '800', flex: 1, textAlign: 'center', marginHorizontal: 8 },
  scrollContent: { paddingBottom: 20 },
  heroBox: {
    width: '100%',
    height: 220,
    position: 'relative',
    backgroundColor: '#000',
  },
  heroImage: { width: '100%', height: '100%' },
  ratingPill: {
    position: 'absolute',
    bottom: 12,
    right: 14,
    backgroundColor: 'rgba(0,0,0,0.75)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
    gap: 4,
  },
  ratingPillText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  infoCard: {
    padding: 18,
    gap: 8,
  },
  restaurantName: { fontSize: 20, fontWeight: '900', marginBottom: 4 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  addressText: { fontSize: 13, flex: 1 },
  openStatusText: { fontSize: 13, fontWeight: '700' },
  phoneText: { fontSize: 13, fontWeight: '600' },
  menuSection: { marginTop: 16 },
  sectionHeader: { paddingHorizontal: 16, marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '900' },
  sectionSub: { fontSize: 12, marginTop: 2 },
  menuRow: { paddingHorizontal: 16 },
  otherSection: { marginTop: 24, paddingHorizontal: 16 },
  otherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    gap: 12,
  },
  otherThumb: { width: 60, height: 60, borderRadius: 10 },
  otherMeta: { flex: 1 },
  otherName: { fontSize: 14, fontWeight: '800' },
  otherAddr: { fontSize: 11, marginTop: 2 },
  otherRating: { fontSize: 11, fontWeight: '700', marginTop: 4 },
  checkPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  checkPillText: { fontSize: 12, fontWeight: '800' },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
  },
  tableAvailability: { fontSize: 12, fontWeight: '800' },
  priceTag: { fontSize: 14, fontWeight: '800', marginTop: 2 },
  bookTableBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: radius.full,
    gap: 6,
  },
  bookTableText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
});
