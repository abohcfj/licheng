INSERT INTO `ry-vue`.sys_menu
(menu_id, menu_name, parent_id, order_num, `path`, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
VALUES(2000, '供应商管理', 0, 1, 'suppliers', 'suppliers/index', NULL, 1, 1, 'C', '0', '0', '', '#', 'admin', '2022-10-11 09:20:46', 'admin', '2022-10-11 09:21:17', '');
INSERT INTO `ry-vue`.sys_menu
(menu_id, menu_name, parent_id, order_num, `path`, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
VALUES(2001, '审核权限', 2000, 1, '', NULL, NULL, 1, 0, 'F', '0', '0', 'suppliers:audit', '#', 'admin', '2022-10-11 16:08:01', '', NULL, '');
