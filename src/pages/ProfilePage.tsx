import AvatarForm from "@/components/profile/AvatarForm"
import ProfileForm from "@/components/profile/ProfileForm"

const EditProfile = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-2xl flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <AvatarForm />
      </div>
      <div className="flex flex-col gap-5">
        <ProfileForm />
      </div>
    </div>
  )
}

export default EditProfile
