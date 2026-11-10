import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';
import { userProfile } from '../data';

export default function Header({ showLocation = true, title }) {
  const router = useRouter();
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {showLocation ? (
        <View style={styles.locationRow}>
          <View style={styles.locationLeft}>
            <View style={[styles.iconCircle, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="location" size={18} color={colors.primary} />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={[styles.locationLabel, { color: theme.subText }]}>Your Location</Text>
              <Text style={[styles.locationAddress, { color: theme.text }]} numberOfLines={1}>
                {userProfile.location}
              </Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[styles.headerActionBtn, { backgroundColor: theme.inputBg }]}
              onPress={toggleTheme}
            >
              <Ionicons name={isDark ? 'sunny' : 'moon'} size={18} color={theme.text} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.avatarBtn}
              onPress={() => router.push('/(tabs)/profile')}
            >
              <Image
                source={require('../assets/images/avatar_user.png')}
                style={styles.avatarImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.titleRow}>
          <Text style={[styles.screenTitle, { color: theme.text }]}>{title}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  locationAddress: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBtn: {
    position: 'relative',
  },
  avatarImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  titleRow: {
    paddingVertical: 4,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
});
