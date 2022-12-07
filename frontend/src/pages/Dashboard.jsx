import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GoalForm from '../components/GoalForm';
import Spinner from '../components/Spinner';
import { getGoals, reset } from '../features/goals/goalsSlice';
import GoalItem from '../components/GoalItem';

function Dashboard() {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.authReducer);
	const { goals, isLoading, isError, message } = useSelector(
		(state) => state.goalReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			console.error(message);
		}

		if (!user) {
			navigate('/login');
		}

		dispatch(getGoals());

		return () => {
			dispatch(reset());
		};
	}, [user, navigate, isError, dispatch, message]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className="heading">
				<h1>Welcome {user && user.name}</h1>
				<p>Goals dashboard</p>
			</section>

			<GoalForm />

			<section className="content">
				{goals.length > 0 ? (
					<div className="goals">
						{goals.map((goal) => {
							return <GoalItem key={goal.id} goal={goal} />;
						})}
					</div>
				) : (
					<h3>You have not set any goals yet</h3>
				)}
			</section>
		</>
	);
}

export default Dashboard;
