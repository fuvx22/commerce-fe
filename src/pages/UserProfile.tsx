import { useAuth } from '@/auth/authContext';
import { Button } from '@/components/ui/button';

const UserProfile = () => {
  const { user, logout } = useAuth()

  return (
    <div>
      <h1 className="text-2xl font-bold my-2">User Profile</h1>
      <p>Role: {user?.role}</p>
      <p>Email: {user?.email}</p>
      <p>Name: {user?.fullName}</p>

      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>

  )
}

export default UserProfile;