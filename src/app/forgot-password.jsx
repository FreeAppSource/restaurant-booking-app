import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, radius, useTheme } from '../theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  // Steps: 1: Enter Email, 2: Back Email Sent, 3: Enter New Password, 4: Success
  const [recoveryStep, setRecoveryStep] = useState(1);
  const [email, setEmail] = useState('sadekbranding@gmail.com');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]} edges={['top', 'bottom']}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          onPress={() => (recoveryStep > 1 ? setRecoveryStep(recoveryStep - 1) : router.back())}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.topTitle, { color: theme.text }]}>
          {recoveryStep === 4 ? 'Success' : 'Forget Password'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {recoveryStep === 1 && (
          /* Step 1: Enter Email */
          <View style={styles.stepBox}>
            <Text style={[styles.headline, { color: theme.text }]}>Forget Password</Text>
            <Text style={[styles.subText, { color: theme.subText }]}>
              Enter your registered email below to receive password reset instructions.
            </Text>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Email address</Text>
              <View style={[styles.inputBox, { backgroundColor: theme.inputBg }]}>
                <Ionicons name="mail-outline" size={18} color={theme.subText} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Eg namaemail@emailkamu.com"
                  placeholderTextColor={theme.subText}
                  style={[styles.inputField, { color: theme.text }]}
                  keyboardType="email-address"
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: colors.primary }]}
              onPress={() => setRecoveryStep(2)}
            >
              <Text style={styles.actionBtnText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()} style={styles.linkRow}>
              <Text style={[styles.linkText, { color: colors.primary }]}>
                Remember the password? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {recoveryStep === 2 && (
          /* Step 2: Back Email (Check Inbox) */
          <View style={styles.stepBox}>
            <View style={[styles.iconCircle, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="mail-open-outline" size={48} color={colors.primary} />
            </View>

            <Text style={[styles.headline, { color: theme.text }]}>Success</Text>
            <Text style={[styles.subText, { color: theme.subText }]}>
              Please check your email {email} to create a new password.
            </Text>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: colors.primary }]}
              onPress={() => setRecoveryStep(3)}
            >
              <Text style={styles.actionBtnText}>Change New Password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Alert.alert('Sent', 'Resent email.')} style={styles.linkRow}>
              <Text style={[styles.linkText, { color: theme.subText }]}>
                Can't get email? Resubmit
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {recoveryStep === 3 && (
          /* Step 3: Enter New Password */
          <View style={styles.stepBox}>
            <Text style={[styles.headline, { color: theme.text }]}>Change New Password</Text>
            <Text style={[styles.subText, { color: theme.subText }]}>
              Enter a different password with the previous password.
            </Text>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: theme.text }]}>New Password</Text>
              <View style={[styles.inputBox, { backgroundColor: theme.inputBg }]}>
                <Ionicons name="lock-closed-outline" size={18} color={theme.subText} />
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="**** **** ****"
                  placeholderTextColor={theme.subText}
                  secureTextEntry
                  style={[styles.inputField, { color: theme.text }]}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Confirm Password</Text>
              <View style={[styles.inputBox, { backgroundColor: theme.inputBg }]}>
                <Ionicons name="lock-closed-outline" size={18} color={theme.subText} />
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="**** **** ****"
                  placeholderTextColor={theme.subText}
                  secureTextEntry
                  style={[styles.inputField, { color: theme.text }]}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: colors.primary }]}
              onPress={() => setRecoveryStep(4)}
            >
              <Text style={styles.actionBtnText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        )}

        {recoveryStep === 4 && (
          /* Step 4: Success confirmation */
          <View style={styles.stepBox}>
            <View style={[styles.iconCircle, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="checkmark-circle" size={54} color={colors.primary} />
            </View>

            <Text style={[styles.headline, { color: theme.text }]}>Success</Text>
            <Text style={[styles.subText, { color: theme.subText }]}>
              Congratulations your password has been changed successfully.
            </Text>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: colors.primary }]}
              onPress={() => router.replace('/auth')}
            >
              <Text style={styles.actionBtnText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  stepBox: { alignItems: 'center' },
  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headline: { fontSize: 24, fontWeight: '900', marginBottom: 8, textAlign: 'center' },
  subText: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 28 },
  fieldGroup: { width: '100%', gap: 6, marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '700' },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 14,
    gap: 10,
  },
  inputField: { flex: 1, fontSize: 14 },
  actionBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  actionBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  linkRow: { marginTop: 20 },
  linkText: { fontSize: 13, fontWeight: '700' },
});
