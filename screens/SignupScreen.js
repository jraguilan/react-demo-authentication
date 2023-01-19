import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext)

  async function signupHandler({ email, password }) {
    setIsLoading(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not create user. Please check your inputs or try again later!'
      );
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message='Creating user...' />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
