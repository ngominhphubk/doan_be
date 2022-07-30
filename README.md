-   tao them thu muc pubic\images ở root

-   Don't forget the enctype="multipart/form-data" in your form.
    [code]

<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>

[code]
