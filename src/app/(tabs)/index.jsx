import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../../theme';
import { promoBanners, dishesData, restaurantsData } from '../../data';
import Header from '../../components/Header';
import DishCard from '../../components/DishCard';
import RestaurantCard from '../../components/RestaurantCard';
import BookingModal from '../../components/BookingModal';

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);

  const filteredRestaurants = restaurantsData.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookTable = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setBookingModalVisible(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* Location Header */}
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Bar (Sketch: Search) */}
        <View style={styles.searchSection}>
          <View style={[styles.searchBox, { backgroundColor: theme.inputBg }]}>
            <Ionicons name="search" size={18} color={theme.subText} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search restaurant, food..."
              placeholderTextColor={theme.subText}
              style={[styles.searchInput, { color: theme.text }]}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color={theme.subText} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Promotional Hero Banners Carousel (Flash Offer & New Arivable) */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.promoCarousel}
        >
          {promoBanners.map((promo) => (
            <View
              key={promo.id}
              style={[styles.promoCard, { backgroundColor: promo.bg }]}
            >
              <View style={styles.promoLeft}>
                <View style={styles.promoTagBadge}>
                  <Text style={styles.promoTagText}>{promo.tag}</Text>
                </View>
                <Text style={styles.promoTitle}>{promo.title}</Text>
                <TouchableOpacity
                  style={styles.promoOrderBtn}
                  onPress={() => router.push({ pathname: '/details', params: { restaurantId: 'r-ambrosia' } })}
                >
                  <Text style={styles.promoOrderText}>{promo.cta}</Text>
                </TouchableOpacity>
              </View>

              <Image
                source={require('../../assets/images/banner_burger.png')}
                style={styles.promoImage}
                resizeMode="contain"
              />
            </View>
          ))}
        </ScrollView>

        {/* Section: Today New Arivable (Chicken Biryani, Sauce Tonkatsu, Chicken Katsu, Dumpling) */}
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Today New Arivable</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.subText }]}>
              Best of the today food list update
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push({ pathname: '/details', params: { restaurantId: 'r-ambrosia' } })}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dishesRow}>
          {dishesData.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onOrderPress={() => handleBookTable(restaurantsData[0])}
            />
          ))}
        </ScrollView>

        {/* Section: Explore Restaurant / Nearby */}
        <View style={[styles.sectionHeaderRow, { marginTop: 24 }]}>
          <View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Explore Restaurant</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.subText }]}>
              Check your city Near by Restaurant
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/map')}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>View Map</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.restaurantList}>
          {filteredRestaurants.map((rest) => (
            <RestaurantCard
              key={rest.id}
              restaurant={rest}
              onBookPress={handleBookTable}
            />
          ))}
        </View>
      </ScrollView>

      {/* Booking Sheet Modal */}
      <BookingModal
        visible={bookingModalVisible}
        onClose={() => setBookingModalVisible(false)}
        restaurant={selectedRestaurant}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 28 },
  searchSection: { paddingHorizontal: 16, paddingVertical: 6 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    borderRadius: 23,
    paddingHorizontal: 14,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14 },
  promoCarousel: { paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
  promoCard: {
    width: 320,
    height: 140,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    overflow: 'hidden',
  },
  promoLeft: { flex: 1, justifyContent: 'space-between', height: '100%' },
  promoTagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  promoTagText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
  promoTitle: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', lineHeight: 18 },
  promoOrderBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  promoOrderText: { color: '#111827', fontSize: 11, fontWeight: '800' },
  promoImage: { width: 110, height: 110 },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: '900', letterSpacing: -0.3 },
  sectionSubtitle: { fontSize: 12, marginTop: 2 },
  seeAllText: { fontSize: 13, fontWeight: '800' },
  dishesRow: { paddingHorizontal: 16 },
  restaurantList: { paddingHorizontal: 16, marginTop: 4 },
});
