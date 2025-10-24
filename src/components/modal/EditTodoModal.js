import Modal from 'react-modal';
import styles from './editTodoModal.module.css';

export const EditTodoModal = ({ isOpen, value, onChange, onSave, onClose, loading }) => {
	return (
		<Modal
			className={styles.modal}
			isOpen={isOpen}
			onRequestClose={onClose}
			overlayClassName={styles.overlay}
			shouldCloseOnOverlayClick={!loading}
		>
			<div className={styles.modalContainer}>
				<h2 className={styles.modalHeading}>Редактирование задачи</h2>

				<input
					className={styles.modalInput}
					value={value}
					onChange={(event) => onChange(event.target.value)}
					disabled={loading}
					autoFocus
					placeholder="Введите новый текст"
				/>

				<div className={styles.modalButtonsContainer}>
					<button
						className={styles.modalButton}
						onClick={onSave}
						disabled={loading || !value.trim()}
					>
						{loading ? 'Сохраняем…' : 'Сохранить'}
					</button>

					<button
						className={styles.modalButton}
						onClick={onClose}
						disabled={loading}
					>
						Отмена
					</button>
				</div>
			</div>
		</Modal>
	)
}
