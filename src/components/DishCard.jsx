import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';

export default function DishCard({ dish, onOrderPress }) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => router.push({ pathname: '/details', params: { restaurantId: 'r-ambrosia' } })}
        activeOpacity={0.9}
      >
        <Image
          source={require('../assets/images/dish_biryani.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>{dish.price}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.details}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {dish.title}
        </Text>
        <Text style={[styles.restaurant, { color: theme.subText }]} numberOfLines={1}>
          {dish.restaurant}
        </Text>

        <View style={styles.bottomRow}>
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={13} color="#FFC107" />
            <Text style={[styles.ratingVal, { color: theme.text }]}>{dish.rating}</Text>
          </View>

          <TouchableOpacity
            style={[styles.orderBtn, { backgroundColor: colors.primary }]}
            onPress={() => onOrderPress ? onOrderPress(dish) : router.push({ pathname: '/details', params: { restaurantId: 'r-ambrosia' } })}
            activeOpacity={0.8}
          >
            <Text style={styles.orderBtnText}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 170,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginRight: 14,
  },
  imageContainer: {
    width: '100%',
    height: 110,
    position: 'relative',
    backgroundColor: '#000',
  },
  image: { width: '100%', height: '100%' },
  priceBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  priceText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  details: { padding: 10 },
  title: { fontSize: 14, fontWeight: '800', marginBottom: 2 },
  restaurant: { fontSize: 11, marginBottom: 8 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingVal: { fontSize: 12, fontWeight: '700' },
  orderBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  orderBtnText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
});
