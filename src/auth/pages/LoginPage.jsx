import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useMemo } from 'react';

const formData = {
	email: '',
	password: '',
};

export const LoginPage = () => {
	const dispatch = useDispatch();
	const { status, errorMessage } = useSelector((state) => state.auth);

	const { onInputChange, email, password, formState } = useForm(formData);

	const isAuthenticating = useMemo(() => status === 'checking', [status]);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(startLoginWithEmailPassword({ email, password }));
	};

	const onGoogleSignIn = () => {
		dispatch(startGoogleSignIn());
	};

	return (
		<AuthLayout title='Login'>
			<form
				aria-label='submit-form'
				onSubmit={onSubmit}
				className='animate__animated animate__fadeIn animate__faster'
			>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Correo'
							type='email'
							placeholder='correo@gmail.com'
							fullWidth
							name='email'
							value={email}
							onChange={onInputChange}
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Contraseña'
							type='password'
							placeholder='Contraseña'
							fullWidth
							name='password'
							inputProps={{
								'data-testid': 'password',
							}}
							value={password}
							onChange={onInputChange}
						/>
					</Grid>
					<Grid container display={!!errorMessage ? '' : 'none'} sx={{ mt: 1 }}>
						<Grid item xs={12}>
							<Alert severity='error'>{errorMessage}</Alert>
						</Grid>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} sm={6}>
							<Button type='submit' variant='contained' fullWidth disabled={isAuthenticating}>
								Login
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								aria-label='google-btn'
								variant='contained'
								fullWidth
								onClick={onGoogleSignIn}
								disabled={isAuthenticating}
							>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>
					<Grid container direction='row' justifyContent='end'>
						<Link component={RouterLink} color='inherit' to='/auth/register'>
							Crear una cuenta
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
