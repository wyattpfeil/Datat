var data = {
  token: "Admin",
  category: "TestCategory",
  time: "3:00",
  value: "TestValu"
};
//$.post("http://datat.glitch.me/writeData", data);
var enterButton = document.getElementById("enterBtn")
enterButton.onclick = function() {
  function CreateCategory(categoryName, data) {
    var accordion = document.getElementById("accordion")

    var categoryButtonCard = document.createElement("div")
    categoryButtonCard.className = "card"

    var categoryCardHeader = document.createElement("div")
    categoryCardHeader.className = "card-header"
    categoryCardHeader.id = categoryName

    var mb0 = document.createElement("h5")
    mb0.className = "mb-0"

    var categoryCollapseButton = document.createElement("button")
    categoryCollapseButton.style = "width: 100%; background-color: #007bff; color: white;"
    categoryCollapseButton.className = "btn"
    categoryCollapseButton.setAttribute("data-toggle", "collapse")
    categoryCollapseButton.setAttribute("data-target", "#" + categoryName + "Collapse")
    categoryCollapseButton.setAttribute("aria-expanded", "false")
    categoryCollapseButton.setAttribute("aria-controls", categoryName + "Collapse")
    categoryCollapseButton.innerHTML = categoryName

    var collapse = document.createElement("div")
    collapse.id = categoryName + "Collapse"
    collapse.className = "collapse"
    collapse.setAttribute("aria-labelledby", "headingOne")
    collapse.setAttribute("data-parent", "#accordion")

    var dataList = document.createElement("ul")
    dataList.className = "list-group"

    function addData(dataToAdd) {
      var dataElement = document.createElement("li")
      dataElement.className = "list-group-item"
      dataElement.innerHTML = dataToAdd
      dataList.appendChild(dataElement)
    }


    accordion.appendChild(categoryButtonCard)
    categoryButtonCard.appendChild(categoryCardHeader)
    categoryButtonCard.appendChild(collapse)
    categoryCardHeader.appendChild(mb0)
    mb0.appendChild(categoryCollapseButton)

    //accordion.appendChild(collapse)
    collapse.appendChild(dataList)
    for (i in data)
    {
      var time = i
      var value = data[i]
      addData(time + " | " + value)
    }
  }
  var userToken = document.getElementById("tokenInput").value 
  $.get("http://datat.glitch.me/getData?token=" + userToken, function(response) {
    for (i in response)
    {
      var category = i
      var categoryData = response[i]
      CreateCategory(category, categoryData)
    }
  })
}