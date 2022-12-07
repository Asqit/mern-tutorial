import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGoal } from '../features/goals/goalsSlice';

// goalReducer

function GoalForm() {
	const [text, setText] = useState('');

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(createGoal({ text }));
		setText('');
	};

	return (
		<section className="form">
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="text">Goal</label>
					<input
						value={text}
						onChange={(e) => setText(e.target.value)}
						id="text"
						name="text"
						type="text"
					/>
				</div>
				<div className="form-group">
					<button type="submit" className="btn btn-block">
						Add Goal
					</button>
				</div>
			</form>
		</section>
	);
}

export default GoalForm;
