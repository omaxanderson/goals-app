export default `ALTER TABLE custom_goal_completed
   MODIFY COLUMN date DATE DEFAULT '1970-01-01',
   MODIFY COLUMN week INT DEFAULT 0,
   MODIFY COLUMN month INT DEFAULT 0`;
