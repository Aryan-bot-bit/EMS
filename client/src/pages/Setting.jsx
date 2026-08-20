import { useEffect, useState } from "react"
import Loading from "../assets/components/Loading"
import ProfileForm from "../assets/components/profileForm"
import api from "../api/axios"
import toast from "react-hot-toast"

const Settings = () => {
  // Profile state holds the current form values for the settings page.
  const [profile, setProfile] = useState(null)
  // loading state shows a spinner until profile data is ready.
  const [loading, setLoading] = useState(true)
  // Controls whether the password modal is visible.
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  // Local form state for password inputs.
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
  // Status messages shown after save or password update.
  const [statusMessage, setStatusMessage] = useState("")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile")
        const profileData = res.data
        if (profileData) {
          setProfile({
            fullName: `${profileData.firstName || ""} ${profileData.lastName || ""}`.trim(),
            email: profileData.email || "",
            position: profileData.position || "",
            bio: profileData.bio || "",
          })
        }
      } catch (error) {
        toast.error(error?.response?.data?.error || error?.message || "Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) return <Loading />

  // Update profile state when any profile field changes.
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("/profile", profile)
      const savedProfile = res.data?.profile
      if (savedProfile) {
        setProfile({
          fullName: `${savedProfile.firstName || ""} ${savedProfile.lastName || ""}`.trim(),
          email: savedProfile.email || "",
          position: savedProfile.position || "",
          bio: savedProfile.bio || "",
        })
      }
      setStatusMessage("Profile saved successfully.")
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message || "Failed to save profile")
    }
  }

  // Update password form state as the user types.
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error("Please fill in all password fields")
      return
    }
    if (passwordForm.newPassword.length < 3) {
      toast.error("New password must be at least 3 characters")
      return
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match")
      return
    }

    setPasswordLoading(true)
    try {
      await api.post("/auth/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })
      setShowPasswordModal(false)
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setStatusMessage("Password updated successfully.")
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message || "Failed to update password")
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account and preferences</p>
      </div>

      {statusMessage && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {statusMessage}
        </div>
      )}

      <ProfileForm
        profile={profile}
        onChange={handleProfileChange}
        onSubmit={handleSubmit}
      />

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Password</h2>
            <p className="mt-1 text-sm text-slate-500">Update your account password.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowPasswordModal(true)}
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Change
          </button>
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Change Password</h3>
                <p className="text-sm text-slate-500">Enter your current and new password.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Current Password</span>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="mt-2 w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:bg-white focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">New Password</span>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="mt-2 w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:bg-white focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Confirm Password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="mt-2 w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:bg-white focus:outline-none"
                />
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
