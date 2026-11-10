import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const [step, setStep] = useState(0);

  const onboardingSteps = [
    {
      title: 'Nearby restaurants',
      desc: "You don't have to go far to find a good restaurant, we have provided all the restaurants that is near you",
      image: 'banner_burger.png',
    },
    {
      title: 'Select the Favorites Menu',
      desc: "Now eat well, don't leave the house. You can choose your favorite food only with one click",
      image: 'banner_pizza.png',
    },
    {
      title: 'Good food at a cheap price',
      desc: 'You can eat at expensive restaurants with affordable prices and exclusive booking discounts',
      image: 'dish_biryani.png',
    },
  ];

  const handleNext = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(step + 1);
    } else {
      setStep(3); // Show welcome auth prompt
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      {step < 3 ? (
        <View style={styles.stepContainer}>
          {/* Top Skip Button */}
          <View style={styles.topRow}>
            <View style={[styles.brandPill, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="restaurant" size={16} color={colors.primary} />
              <Text style={styles.brandPillText}>Foodmedia</Text>
            </View>
            <TouchableOpacity onPress={() => setStep(3)}>
              <Text style={[styles.skipText, { color: theme.subText }]}>Skip</Text>
            </TouchableOpacity>
          </View>

          {/* Hero Illustration */}
          <View style={styles.illustrationBox}>
            <Image
              source={require('../assets/images/banner_burger.png')}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>

          {/* Texts & Step Indicators */}
          <View style={styles.bottomBox}>
            <View style={styles.dotsRow}>
              {[0, 1, 2].map((idx) => (
                <View
                  key={idx}
                  style={[
                    styles.dot,
                    step === idx ? { backgroundColor: colors.primary, width: 24 } : { backgroundColor: theme.divider },
                  ]}
                />
              ))}
            </View>

            <Text style={[styles.title, { color: theme.text }]}>
              {onboardingSteps[step].title}
            </Text>
            <Text style={[styles.description, { color: theme.subText }]}>
              {onboardingSteps[step].desc}
            </Text>

            <TouchableOpacity
              style={[styles.nextBtn, { backgroundColor: colors.primary }]}
              onPress={handleNext}
              activeOpacity={0.85}
            >
              <Ionicons name="arrow-forward" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        /* Welcome Choice Artboard (Sketch: First - Welcome Before enjoying Foodmedia services...) */
        <View style={styles.welcomeContainer}>
          <View style={styles.welcomeHero}>
            <Image
              source={require('../assets/images/banner_pizza.png')}
              style={styles.welcomeImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.welcomeContent}>
            <Text style={[styles.welcomeTitle, { color: theme.text }]}>Welcome</Text>
            <Text style={[styles.welcomeSub, { color: theme.subText }]}>
              Before enjoying Foodmedia services, please register first or login with your account.
            </Text>

            <View style={styles.actionColumn}>
              <TouchableOpacity
                style={[styles.createAccountBtn, { backgroundColor: colors.primary }]}
                onPress={() => router.push({ pathname: '/auth', params: { initialTab: 'register' } })}
                activeOpacity={0.85}
              >
                <Text style={styles.createAccountText}>Create Account</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.loginOutlineBtn, { backgroundColor: colors.primarySoft }]}
                onPress={() => router.push({ pathname: '/auth', params: { initialTab: 'login' } })}
                activeOpacity={0.85}
              >
                <Text style={[styles.loginOutlineText, { color: colors.primaryDark }]}>Login</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.termsText, { color: theme.subText }]}>
              By logging in or registering, you have agreed to the Terms and Conditions and Privacy Policy.
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    gap: 6,
  },
  brandPillText: { color: colors.primary, fontSize: 13, fontWeight: '800' },
  skipText: { fontSize: 14, fontWeight: '600' },
  illustrationBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  illustrationImage: { width: width * 0.8, height: '100%' },
  bottomBox: { alignItems: 'center', marginBottom: 20 },
  dotsRow: { flexDirection: 'row', gap: 6, marginBottom: 24 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  title: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
    marginBottom: 32,
  },
  nextBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },
  welcomeContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  welcomeHero: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 280,
  },
  welcomeImage: { width: width * 0.75, height: '100%' },
  welcomeContent: { alignItems: 'center' },
  welcomeTitle: { fontSize: 28, fontWeight: '900', marginBottom: 8 },
  welcomeSub: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 28 },
  actionColumn: { width: '100%', gap: 12, marginBottom: 24 },
  createAccountBtn: {
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  loginOutlineBtn: {
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginOutlineText: { fontSize: 15, fontWeight: '800' },
  termsText: { fontSize: 11, textAlign: 'center', lineHeight: 16 },
});
