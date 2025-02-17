import { FilterQuery } from 'mongodb';

export type SettingId = string;
export type GroupId = SettingId;
export type TabId = SettingId;
export type SectionName = string;

export enum SettingEditor {
	COLOR = 'color',
	EXPRESSION = 'expression',
}
type AssetValue = { defaultUrl?: string };
export type SettingValueMultiSelect = (string | number)[];
export type SettingValueRoomPick = Array<{ _id: string; name: string }> | string;
export type SettingValue = string | boolean | number | SettingValueMultiSelect | Date | AssetValue | undefined;

export interface ISettingSelectOption {
	key: string | number;
	i18nLabel: string;
}

export type ISetting = ISettingBase | ISettingEnterprise | ISettingColor | ISettingCode | ISettingAction;

export interface ISettingBase {
	_id: SettingId;
	type:
		| 'boolean'
		| 'timezone'
		| 'string'
		| 'relativeUrl'
		| 'password'
		| 'int'
		| 'select'
		| 'multiSelect'
		| 'language'
		| 'color'
		| 'font'
		| 'code'
		| 'action'
		| 'asset'
		| 'roomPick'
		| 'group'
		| 'date';
	public: boolean;
	env: boolean;
	group?: GroupId;
	section?: SectionName;
	tab?: TabId;
	i18nLabel: string;
	value: SettingValue;
	packageValue: SettingValue;
	blocked: boolean;
	enableQuery?: string | FilterQuery<ISetting> | FilterQuery<ISetting>[];
	displayQuery?: string | FilterQuery<ISetting> | FilterQuery<ISetting>[];
	sorter: number;
	properties?: unknown;
	enterprise?: boolean;
	requiredOnWizard?: boolean;
	hidden?: boolean;
	modules?: Array<string>;
	invalidValue?: SettingValue;
	valueSource?: string;
	secret?: boolean;
	i18nDescription?: string;
	autocomplete?: boolean;
	processEnvValue?: SettingValue;
	meteorSettingsValue?: SettingValue;
	ts: Date;
	createdAt: Date;
	_updatedAt?: Date;
	multiline?: boolean;
	values?: Array<ISettingSelectOption>;
	placeholder?: string;
	wizard?: {
		step: number;
		order: number;
	} | null;
	persistent?: boolean; // todo: remove
	readonly?: boolean; // todo: remove
	alert?: string; // todo: check if this is still used
	private?: boolean; // todo: remove
}

export interface ISettingGroup {
	_id: string;
	hidden: boolean;
	blocked: boolean;
	ts?: Date;
	sorter: number;
	i18nLabel: string;
	displayQuery?: string | FilterQuery<ISetting> | FilterQuery<ISetting>[];
	i18nDescription: string;
	value?: undefined;
	type: 'group';

	alert?: string; // todo: check if this is needed
}

export interface ISettingEnterprise extends ISettingBase {
	enterprise: true;
	invalidValue: SettingValue;
}

export interface ISettingColor extends ISettingBase {
	type: 'color';
	editor: SettingEditor;
	packageEditor?: SettingEditor;
}
export interface ISettingCode extends ISettingBase {
	type: 'code';
	code?: string;
}

export interface ISettingAction extends ISettingBase {
	type: 'action';
	value: string;
	actionText?: string;
}
export interface ISettingAsset extends ISettingBase {
	type: 'asset';
	value: AssetValue;
}

export interface ISettingDate extends ISettingBase {
	type: 'date';
	value: Date;
}

export const isDateSetting = (setting: ISetting): setting is ISettingDate => setting.type === 'date';

export const isSettingEnterprise = (setting: ISettingBase): setting is ISettingEnterprise => setting.enterprise === true;

export const isSettingColor = (setting: ISettingBase): setting is ISettingColor => setting.type === 'color';

export const isSettingCode = (setting: ISettingBase): setting is ISettingCode => setting.type === 'code';

export const isSettingAction = (setting: ISettingBase): setting is ISettingAction => setting.type === 'action';

export const isSettingAsset = (setting: ISettingBase): setting is ISettingAsset => setting.type === 'asset';
