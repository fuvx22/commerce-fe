import { useAuth } from '@/auth/authContext';
import { Button } from '@/components/ui/button';

const UserProfile = () => {
  const { user, logout } = useAuth()

  return (
    <div>
      <h1>User Profile</h1>
      <p>ID: {user?.id}</p>
      <p>Email: {user?.email}</p>
      <p>Name: {user?.name}</p>

      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>

  )
}

export default UserProfile;