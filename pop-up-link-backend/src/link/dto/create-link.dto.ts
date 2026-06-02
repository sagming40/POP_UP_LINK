export class CreateLinkDto {
    title!: string;
    url!: string;
    sequence?: number; // ? : 선택적 속성으로, 링크의 순서를 나타냅니다. 이 값이 없으면 기본적으로 0으로 간주됩니다.
}
