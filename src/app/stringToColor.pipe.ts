import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'stringToColor' })
export class StringToColorPipe implements PipeTransform {

  // from https://www.materialui.co/colors (300)
  static colors: string[] = [
    "#e57373",
    "#F06292",
    "#BA68C8",
    "#9575CD",
    "#7986CB",
    "#64B5F6",
    "#4FC3F7",
    "#4DD0E1",
    "#4DB6AC",
    "#81C784",
    "#AED581",
    "#DCE775",
    "#FFF176",
    "#FFD54F",
    "#FFB74D",
    "#FF8A65",
    "#A1887F",
    "#E0E0E0",
    "#90A4AE",
  ];



  transform(value: string): string {

    let i = 0;
    value?.split('').map(c => i += c.charCodeAt(0));
    return StringToColorPipe.colors[i % StringToColorPipe.colors.length];
  }
}


@Pipe({ name: 'stringToForegroundColor' })
export class StringToForegroundColorPipe implements PipeTransform {

  // from https://www.materialui.co/colors (300)
  static colors: string[] = [
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
    "#fff",
  ];



  transform(value: string): string {

    let i = 0;
    value?.split('').map(c => i += c.charCodeAt(0));
    return StringToForegroundColorPipe.colors[i % StringToForegroundColorPipe.colors.length];
  }
}
