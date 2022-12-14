INSERT INTO `ry-vue`.sys_menu
(menu_id, menu_name, parent_id, order_num, `path`, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
VALUES(2000, '供应商管理', 0, 1, 'suppliers', 'suppliers/index', NULL, 1, 1, 'C', '0', '0', '', '#', 'admin', '2022-10-11 09:20:46', 'admin', '2022-10-11 09:21:17', '');
INSERT INTO `ry-vue`.sys_menu
(menu_id, menu_name, parent_id, order_num, `path`, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
VALUES(2001, '审核权限', 2000, 1, '', NULL, NULL, 1, 0, 'F', '0', '0', 'suppliers:audit', '#', 'admin', '2022-10-11 16:08:01', '', NULL, '');
INSERT INTO `ry-vue`.sys_menu
(menu_id, menu_name, parent_id, order_num, `path`, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
VALUES(2002, 'Bom管理', 0, 2, 'bom', 'bom/index', NULL, 1, 1, 'C', '0', '0', NULL, '#', 'admin', '2022-10-11 16:56:18', '', NULL, '');
INSERT INTO ryvue.sys_menu
(menu_id, menu_name, parent_id, order_num, `path`, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
VALUES(2003, 'SKU采购详情', 0, 1, 'pdetails', 'bom/purchaseDetails', NULL, 1, 1, 'C', '1', '0', '', '#', 'admin', '2022-10-11 22:20:38.0', 'admin', '2022-10-11 22:24:44.0', '');

UPDATE `ry-vue`.sys_menu
SET menu_name='SKU采购详情', parent_id=0, order_num=1, `path`='sku', component='bom/sku', query=NULL, is_frame=1, is_cache=1, menu_type='C', visible='1', status='0', perms='', icon='#', create_by='admin', create_time='2022-10-11 22:20:38', update_by='admin', update_time='2022-10-12 10:04:10', remark=''
WHERE menu_id=2003;

供应商表单 供应商、供应商代码改成下拉选择 下拉选择改成远程搜索
表格搜索弹出改成在表头下面显示选择框
BOM管理表单 供应商代码改成下拉
SKU采购详情表格 sku合并行
INSERT INTO ryvue.sys_menu
(menu_id, menu_name, parent_id, order_num, `path`, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
VALUES(2002, '成品管理', 2004, 3, 'finished_product', 'bom/f_product/index', NULL, 1, 1, 'C', '0', '0', '', '#', 'admin', '2022-10-11 16:56:18', 'admin', '2022-10-22 15:14:35', '');
INSERT INTO ryvue.sys_menu
(menu_id, menu_name, parent_id, order_num, `path`, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
VALUES(2003, 'SKU采购详情', 0, 1, 'sku', 'bom/sku', NULL, 1, 1, 'C', '1', '0', '', '#', 'admin', '2022-10-11 22:20:38', 'admin', '2022-10-12 10:04:10', '');
INSERT INTO ryvue.sys_menu
(menu_id, menu_name, parent_id, order_num, `path`, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
VALUES(2004, 'BOM管理', 0, 0, 'bom', NULL, NULL, 1, 0, 'M', '0', '0', '', '#', 'admin', '2022-10-22 14:59:39', 'admin', '2022-10-22 15:07:24', '');
INSERT INTO ryvue.sys_menu
(menu_id, menu_name, parent_id, order_num, `path`, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
VALUES(2005, '最小采购单位管理', 2004, 1, 'purchasing_unit', 'bom/p_unit/index', NULL, 1, 1, 'C', '0', '0', '', '#', 'admin', '2022-10-22 15:04:37', 'admin', '2022-10-22 15:14:25', '');
INSERT INTO ryvue.sys_menu
(menu_id, menu_name, parent_id, order_num, `path`, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
VALUES(2006, '物料类别管理', 2004, 2, 'category', 'bom/category/index', NULL, 1, 1, 'C', '0', '0', '', '#', 'admin', '2022-10-22 15:05:31', 'admin', '2022-10-22 15:14:30', '');

INSERT INTO `ry-vue`.sys_menu
(menu_id, menu_name, parent_id, order_num, `path`, component, query, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
VALUES(2003, 'SKU采购详情', 2004, 1, 'sku', 'bom/f_product/sku', NULL, 1, 1, 'C', '1', '0', '', '#', 'admin', '2022-10-11 22:20:38', 'admin', '2022-10-27 14:52:00', '');
