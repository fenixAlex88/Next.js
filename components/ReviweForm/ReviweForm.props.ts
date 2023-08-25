import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ReviweFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
	productId: string;
}