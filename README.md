
# README

## Wersje technologii:

- Ruby ->	2.6.3

- Ruby on Rails -> 5.2.3

- Wersje gem'ów mozna w Gemfile sprawdzić

---

## Workflow
Na tą skalę możemy spokojnie pracować w [GitHub Flow](https://guides.github.com/introduction/flow/). 

Bezpośrednie commitowanie i mergowanie do `mastera` jest zablokowane. Wszystkie zmiany robimy na jakoś adekwatnie nazwanym branchu.
By zmergować brancha do mastera trzeba zrobic pull request wymagający review. Najlepiej używac labeli do tych pull requestów by było się łatwo ogrnąć w zmergowancych requestach.

Poza defaultowymi labelami GitHub'a dodałem:
* __feature__ - jak robimy pulla z nową funkcjonalnością
* __hot-fix__ - jak robimy pulla z fixem dla znalezionych bugów itd.