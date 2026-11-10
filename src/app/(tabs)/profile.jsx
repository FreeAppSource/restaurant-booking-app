import React from 'react';
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
import { userProfile } from '../../data';

export default function ProfileScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const menuItems = [
    { id: 'm-1', title: 'Account setting', icon: 'person-outline', badge: null },
    { id: 'm-2', title: 'Language', icon: 'globe-outline', badge: 'English' },
    { id: 'm-3', title: 'Feedback', icon: 'chatbox-ellipses-outline', badge: null },
    { id: 'm-4', title: 'Rate us', icon: 'star-outline', badge: '5.0 ★' },
    { id: 'm-5', title: 'New Version', icon: 'shield-checkmark-outline', badge: 'v2.4.0' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to sign out of Foodmedia?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => router.replace('/') },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top']}>
      {/* Top Header */}
      <View style={[styles.topBar, { backgroundColor: theme.surface }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Account</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Profile Card (Sketch: Sadek Hossen / sadekbranding@gmail.com / 3 Active badge) */}
        <View style={[styles.userCard, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
          <Image
            source={require('../../assets/images/avatar_user.png')}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.text }]}>{userProfile.name}</Text>
            <Text style={[styles.userEmail, { color: theme.subText }]}>{userProfile.email}</Text>
          </View>

          {/* Active Bookings Badge (Sketch 3) */}
          <TouchableOpacity
            style={[styles.bookingBadge, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/(tabs)/history')}
          >
            <Text style={styles.bookingBadgeNumber}>{userProfile.activeBookingsCount}</Text>
            <Text style={styles.bookingBadgeText}>Active</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items List */}
        <View style={[styles.menuContainer, { backgroundColor: theme.surface, borderColor: theme.cardBorder }]}>
          {menuItems.map((item, idx) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                style={styles.menuRow}
                onPress={() => Alert.alert(item.title, `Opening ${item.title}...`)}
                activeOpacity={0.7}
              >
                <View style={styles.menuLeft}>
                  <View style={[styles.iconBox, { backgroundColor: colors.primarySoft }]}>
                    <Ionicons name={item.icon} size={18} color={colors.primary} />
                  </View>
                  <Text style={[styles.menuTitle, { color: theme.text }]}>{item.title}</Text>
                </View>

                <View style={styles.menuRight}>
                  {item.badge && (
                    <Text style={[styles.badgeText, { color: theme.subText }]}>{item.badge}</Text>
                  )}
                  <Ionicons name="chevron-forward" size={16} color={theme.subText} />
                </View>
              </TouchableOpacity>
              {idx < menuItems.length - 1 && (
                <View style={[styles.divider, { backgroundColor: theme.divider }]} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutBtn, { backgroundColor: '#FEE2E2' }]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={18} color={colors.accentRed} />
          <Text style={[styles.logoutText, { color: colors.accentRed }]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 20, paddingVertical: 12 },
  headerTitle: { fontSize: 22, fontWeight: '900' },
  scrollContent: { padding: 16, gap: 16 },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  userInfo: { flex: 1, marginLeft: 14 },
  userName: { fontSize: 16, fontWeight: '800' },
  userEmail: { fontSize: 12, marginTop: 2 },
  bookingBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    alignItems: 'center',
  },
  bookingBadgeNumber: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  bookingBadgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: '700' },
  menuContainer: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTitle: { fontSize: 14, fontWeight: '700' },
  menuRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  divider: { height: 1, width: '100%' },
  logoutBtn: {
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  logoutText: { fontSize: 14, fontWeight: '800' },
});
