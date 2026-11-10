import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, radius, useTheme } from '../theme';

export default function AuthScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const params = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState(params.initialTab === 'login' ? 'login' : 'register');
  const [fullName, setFullName] = useState('Sadek Hossen Rony');
  const [email, setEmail] = useState('sadekbranding@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Incomplete Form', 'Please fill in all required fields.');
      return;
    }
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top', 'bottom']}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.topTitle, { color: theme.text }]}>
          {activeTab === 'register' ? 'Registration' : 'Login'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Tab Switcher: Create Account | Login */}
        <View style={[styles.tabBar, { backgroundColor: theme.inputBg }]}>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'register' && { backgroundColor: '#FFFFFF', elevation: 2 },
            ]}
            onPress={() => setActiveTab('register')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'register' ? colors.primaryDark : theme.subText, fontWeight: '800' },
              ]}
            >
              Create Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'login' && { backgroundColor: '#FFFFFF', elevation: 2 },
            ]}
            onPress={() => setActiveTab('login')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === 'login' ? colors.primaryDark : theme.subText, fontWeight: '800' },
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={styles.formContainer}>
          {activeTab === 'register' && (
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>Full Name</Text>
              <View style={[styles.inputBox, { backgroundColor: theme.inputBg }]}>
                <Ionicons name="person-outline" size={18} color={theme.subText} />
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your full name"
                  placeholderTextColor={theme.subText}
                  style={[styles.inputField, { color: theme.text }]}
                />
              </View>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>Email address</Text>
            <View style={[styles.inputBox, { backgroundColor: theme.inputBg }]}>
              <Ionicons name="mail-outline" size={18} color={theme.subText} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Eg namaemail@emailkamu.com"
                placeholderTextColor={theme.subText}
                keyboardType="email-address"
                autoCapitalize="none"
                style={[styles.inputField, { color: theme.text }]}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>Password</Text>
            <View style={[styles.inputBox, { backgroundColor: theme.inputBg }]}>
              <Ionicons name="lock-closed-outline" size={18} color={theme.subText} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="**** **** ****"
                placeholderTextColor={theme.subText}
                secureTextEntry={!showPassword}
                style={[styles.inputField, { color: theme.text }]}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={theme.subText} />
              </TouchableOpacity>
            </View>
          </View>

          {activeTab === 'login' && (
            <TouchableOpacity
              style={styles.forgotBtn}
              onPress={() => router.push('/forgot-password')}
            >
              <Text style={[styles.forgotText, { color: colors.primary }]}>Forget Password?</Text>
            </TouchableOpacity>
          )}

          {/* Primary Action Button */}
          <TouchableOpacity
            style={[styles.submitBtn, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            <Text style={styles.submitBtnText}>
              {activeTab === 'register' ? 'Registration' : 'Login'}
            </Text>
          </TouchableOpacity>

          <View style={styles.orRow}>
            <View style={[styles.orLine, { backgroundColor: theme.divider }]} />
            <Text style={[styles.orText, { color: theme.subText }]}>OR</Text>
            <View style={[styles.orLine, { backgroundColor: theme.divider }]} />
          </View>

          {/* Google Sign In */}
          <TouchableOpacity
            style={[styles.googleBtn, { backgroundColor: theme.inputBg }]}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Ionicons name="logo-google" size={18} color="#EA4335" />
            <Text style={[styles.googleBtnText, { color: theme.text }]}>
              {activeTab === 'register' ? 'Sign up with Google' : 'Login with Google'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  topTitle: { fontSize: 18, fontWeight: '800' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 32 },
  tabBar: {
    flexDirection: 'row',
    borderRadius: radius.full,
    padding: 4,
    marginBottom: 24,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: radius.full,
  },
  tabText: { fontSize: 13 },
  formContainer: { gap: 16 },
  inputGroup: { gap: 6 },
  inputLabel: { fontSize: 13, fontWeight: '700' },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 14,
    gap: 10,
  },
  inputField: { flex: 1, fontSize: 14 },
  forgotBtn: { alignSelf: 'flex-end', marginTop: -4 },
  forgotText: { fontSize: 12, fontWeight: '700' },
  submitBtn: {
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 12 },
  orLine: { flex: 1, height: 1 },
  orText: { fontSize: 12, fontWeight: '700' },
  googleBtn: {
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  googleBtnText: { fontSize: 14, fontWeight: '700' },
});
