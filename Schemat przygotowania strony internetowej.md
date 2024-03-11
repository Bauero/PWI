### 1. Informacja nt. typu dokumentu
Wymusza ona w przeglądarce interpretację tego dokumentu jako strony typu <span style="color:violet">***HTML***</span>

```html
<!DOCTYPE html>
```

### 2. Otwieramy klamry dokumentu - to tutaj jest sama treść
 Aby przygotować nasz dokument html musimy zdefiniować obręb treść naszego dokumentu -  robimy to poprzez użycie tagów HTML:
 ```html
 <html lang="en">
 	 <head> ... </head>
 
	 <body> ... </body>
 </html>
```

### 3. Uzupełnienie naszego *head's*
W tej części kodu podajemy najważniejsze informacje potrzebne do działania naszej strony internetowej - w szczególności, są to:
#### 3.1 Zakres działania czcionki
```html
<meta charset="UTF-8">
```
#### 3.2 Tytuł naszej karty
```html
<title>Nasz tytuł karty internetowej</title>
```

#### 3.3 Link do pliku ze stylami
```html
<link rel="stylesheet" href="index.css">
```

#### 3.4 Linki do czcionek innych i innych zasobów które używamy
```html
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&amp;display=swap" rel="stylesheet">
```

### 4. Tworzymy body
Jest to główna część tego co znajduje się na stronie internetowej - to tutaj umieszczamy elementy i tworzymy szkielet naszej strony
