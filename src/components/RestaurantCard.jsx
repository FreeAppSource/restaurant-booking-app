import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';

export default function RestaurantCard({ restaurant, onBookPress }) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}
      onPress={() => router.push({ pathname: '/details', params: { restaurantId: restaurant.id } })}
      activeOpacity={0.88}
    >
      <View style={styles.imageBox}>
        <Image
          source={require('../assets/images/rest_ambrosia.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FFC107" />
          <Text style={styles.ratingText}>{restaurant.rating}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <Text style={[styles.distance, { color: colors.primary }]}>{restaurant.distance}</Text>
        </View>

        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={14} color={theme.subText} />
          <Text style={[styles.address, { color: theme.subText }]} numberOfLines={1}>
            {restaurant.address}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.openTag}>
            <View style={styles.statusDot} />
            <Text style={styles.openText}>Open today</Text>
          </View>

          <TouchableOpacity
            style={[styles.checkBtn, { backgroundColor: colors.primary }]}
            onPress={() => onBookPress ? onBookPress(restaurant) : router.push({ pathname: '/details', params: { restaurantId: restaurant.id } })}
          >
            <Text style={styles.checkBtnText}>Check</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 14,
    padding: 10,
    gap: 12,
  },
  imageBox: {
    width: 90,
    height: 90,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },
  image: { width: '100%', height: '100%' },
  ratingBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 3,
  },
  ratingText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
  content: { flex: 1, justifyContent: 'space-between' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 15, fontWeight: '800', flex: 1, marginRight: 8 },
  distance: { fontSize: 12, fontWeight: '700' },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  address: { fontSize: 12, flex: 1 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  openTag: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: colors.primary },
  openText: { fontSize: 11, fontWeight: '600', color: colors.primary },
  checkBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  checkBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
});
