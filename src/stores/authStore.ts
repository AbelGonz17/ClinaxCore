import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "@/Types";
import { getUserInitials } from "@/utils/format";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value && !!user.value);

  const userInitials = computed(() => getUserInitials(user.value?.name));

  function init() {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");

    if (storedToken && storedUser) {
      token.value = storedToken;
      try {
        user.value = JSON.parse(storedUser);
      } catch {
        logout();
      }
    }
  }

  async function login(email: string, password: string): Promise<boolean> {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (!email || !password) {
        error.value = "Por favor ingresa email y contraseña";
        return false;
      }

      if (password.length < 6) {
        error.value = "La contraseña debe tener al menos 6 caracteres";
        return false;
      }

      const mockUser: User = {
        id: "1",
        name: "Dra. Laura Lopez",
        email: email,
        specialty: "Geriatra",
      };

      const mockToken = "mock_jwt_token_" + Date.now();

      user.value = mockUser;
      token.value = mockToken;

      localStorage.setItem("auth_token", mockToken);
      localStorage.setItem("auth_user", JSON.stringify(mockUser));

      return true;
    } catch (e) {
      error.value = "Error al iniciar sesión. Intenta de nuevo.";
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
    error.value = null;

    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  }

  function clearError() {
    error.value = null;
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    userInitials,
    init,
    login,
    logout,
    clearError,
  };
});
