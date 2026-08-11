import React from 'react'

const ProfileForm = ({ profile, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Full Name</span>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={onChange}
              className="mt-2 w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:bg-white focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={onChange}
              className="mt-2 w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:bg-white focus:outline-none"
            />
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Position</span>
            <input
              type="text"
              name="position"
              value={profile.position}
              onChange={onChange}
              className="mt-2 w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:bg-white focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Bio</span>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={onChange}
              rows={4}
              className="mt-2 w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:bg-white focus:outline-none"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  )
}

export default ProfileForm
