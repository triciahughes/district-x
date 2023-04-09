"""update avatar thumbnail data type string

Revision ID: 6bac335d67c3
Revises: 0fa40aa09fe0
Create Date: 2023-04-09 13:09:21.345658

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6bac335d67c3'
down_revision = '0fa40aa09fe0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('thumbnail',
               existing_type=sa.BLOB(),
               type_=sa.String(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('thumbnail',
               existing_type=sa.String(),
               type_=sa.BLOB(),
               existing_nullable=True)

    # ### end Alembic commands ###
