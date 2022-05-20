// list
import BulletListExtension from '@tiptap/extension-bullet-list';
import OrderedListExtension from '@tiptap/extension-ordered-list';
import ListItemExtension from '@tiptap/extension-list-item';
import TaskListExtension from '@tiptap/extension-task-list';
import TaskItemExtension from '@tiptap/extension-task-item';

export type { BulletListOptions } from '@tiptap/extension-bullet-list';
export type { OrderedListOptions } from '@tiptap/extension-ordered-list';
export type { ListItemOptions } from '@tiptap/extension-list-item';
export type { TaskListOptions } from '@tiptap/extension-task-list';
export type { TaskItemOptions } from '@tiptap/extension-task-item';

export const BulletList = BulletListExtension;
export const OrderedList = OrderedListExtension;
export const ListItem = ListItemExtension;
export const TaskList = TaskListExtension;
export const TaskItem = TaskItemExtension;
