var element = document.getElementById("nav");

element.innerHTML = ` <div class="container-fluid">
<a class="navbar-brand " href="/">SIMULATOR</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample05"
  aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarsExample05">
  <ul class="navbar-nav pl-md-5 mr-auto">
    <li class="nav-item">
      <a id="dashboard" class="nav-link " href="./dashboard">Dashboard</a>
    </li>
    <li class="nav-item">
      <a id="buy1" class="nav-link" href="./buy">Buy</a>
    </li>
    <li class="nav-item">
      <a id="sell" class="nav-link" href="./sell">Sell</a>
    </li>
    <li class="nav-item">
      <a id="portfolio" class="nav-link " href="./portfolio">Portfolio</a>
    </li>
    <li class="nav-item">
      <a id="watch" class="nav-link" href="./watch">Watch List</a>
    </li>
  </ul>
  <a href="/"><button id="logout" style= "
      background-color: red;
      border-radius: 10px;
      padding: 10px;
      font-weight: 800;
      color: white; border:none">Logout</button></a>
</div>
</div> ` ;