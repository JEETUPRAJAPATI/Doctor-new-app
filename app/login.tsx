// @ts-nocheck
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/Button";
import { PhoneInput } from "@/components/auth/PhoneInput";
import { CountrySelector } from "@/components/auth/CountrySelector";
import { CountryList } from "@/components/auth/CountryList";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { Image } from "@/components/ui/Image";
import { useCountries } from "@/hooks/useCountries";
import { Country } from "@/types/country";

export default function Login() {
  const router = useRouter();
  const { countries, loading, error, refetch } = useCountries();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showCountryList, setShowCountryList] = useState(false);

  const handleContinue = () => {
    if (!selectedCountry) {
      Alert.alert("Error", "Please select a country");
      return;
    }
    if (phoneNumber.length < 10) {
      Alert.alert("Invalid Phone Number", "Please enter a valid phone number");
      return;
    }
    router.replace("/(tabs)");
  };

  const handleGoogleSignIn = () => {
    router.replace("/(tabs)");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={styles.title}>DoctoPro</Text>

            <View style={styles.illustrationContainer}>
              <Image
                source={require("../assets/images/doctor.png")}
                style={styles.illustration}
              />
            </View>

            <View style={styles.inputContainer}>
              {error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                  <Button title="Retry" onPress={refetch} variant="secondary" />
                </View>
              ) : (
                <>
                  <CountrySelector
                    selectedCountry={selectedCountry?.name || "Select Country"}
                    onPress={() => setShowCountryList(true)}
                  />
                  <PhoneInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    countryCode={selectedCountry?.dialCode}
                    style={{ height: 30 }}
                  />
                  <Button title="Continue" onPress={handleContinue} />
                  <Text style={styles.orText}>Or quick continue with</Text>
                  <GoogleButton onPress={handleGoogleSignIn} />
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CountryList
        visible={showCountryList}
        onClose={() => setShowCountryList(false)}
        countries={countries}
        onSelect={(country) => {
          setSelectedCountry(country);
          setShowCountryList(false);
        }}
        loading={loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6366f1",
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  content: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 80,
    marginTop: 20,
    borderRadius: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },

  illustrationContainer: {
    width: "100%",
    height: 200,
    marginVertical: 20,
    alignItems: "center",
  },
  illustration: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: "auto",
  },
  errorContainer: {
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#ef4444",
    marginBottom: 20,
    textAlign: "center",
  },
  orText: {
    textAlign: "center",
    color: "#64748b",
    marginVertical: 20,
  },
});
