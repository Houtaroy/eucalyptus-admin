import { FormSchema } from '/@/components/Form';
import { ComponentType } from '/@/components/Table/src/types/componentType';

import {
  PropertyEntity,
  PropertyEntityTypeEnum,
} from '/@/apis/code-template-group/models/PropertyEntity';

const components: Map<PropertyEntityTypeEnum, ComponentType> = new Map();
components.set(PropertyEntityTypeEnum.STRING, 'Input');
components.set(PropertyEntityTypeEnum.INTEGER, 'InputNumber');
components.set(PropertyEntityTypeEnum.FLOAT, 'InputNumber');
components.set(PropertyEntityTypeEnum.BOOLEAN, 'Switch');
components.set(PropertyEntityTypeEnum.LOCALDATETIME, 'DatePicker');

const converters: Map<PropertyEntityTypeEnum, Function> = new Map();

converters.set(PropertyEntityTypeEnum.STRING, defaultProperty2FormSchema);
converters.set(PropertyEntityTypeEnum.INTEGER, defaultProperty2FormSchema);
converters.set(PropertyEntityTypeEnum.FLOAT, defaultProperty2FormSchema);
converters.set(PropertyEntityTypeEnum.BOOLEAN, defaultProperty2FormSchema);
converters.set(PropertyEntityTypeEnum.LOCALDATETIME, datetimeProperty2FormSchema);

/**
 * 将属性转换为表单项
 * @param property 属性
 * @returns 表单项
 */
export function property2FormSchema(property: PropertyEntity): FormSchema {
  return converters.get(property.type!)!(property);
}

/**
 * 将日期时间转换为表单项
 * @param property 属性
 * @returns 表单项
 */
function datetimeProperty2FormSchema(property: PropertyEntity): FormSchema {
  const result = defaultProperty2FormSchema(property);
  result.componentProps = {
    showTime: true,
  };
  return result;
}

/**
 * 将属性转换为表单项默认方法
 * @param property 属性
 * @returns 表单项
 */
function defaultProperty2FormSchema(property: PropertyEntity): FormSchema {
  return {
    field: property.code!,
    label: property.name!,
    component: components.get(property.type!)!,
    colProps: { span: 24 },
    required: true,
  };
}
