var app = app || {};


app.viewModel = (function(){

    function ViewModel(model){
        this.model = model;
        this.attachEventListeners();
        this.boughtProducts = [];
    }

    ViewModel.prototype.showAllProducts = function(){

        this.model.getAll(function(product){

                var allStudents = product.results;

                allStudents.forEach(function(e){
                    addProductToDom(e);
                });
            },
            function(){
                console.log('cant take product');
                return false;
            });
    };

    ViewModel.prototype.attachEventListeners = function(){

        var addStudBTN = $('#addProduct');

        addStudBTN.click(function(){
            app.viewModel.products.addProduct();
        })
    };


    ViewModel.prototype.addProduct = function(){

        var ownerName   =  $('#ownerName').val();
        var ownerPhone  = +$('#ownerPhone').val();
        var productName =  $('#productName').val();
        var isNew       =  Boolean($('#isNew').val());
        var inGuarantee =  Boolean($('#inGuarantee').val());
        var city        =  $('#city').val();
        var price       = +$('#price').val();


        var newProduct = {
            ownerName   :ownerName,
            ownerPhone  :ownerPhone,
            productName :productName,
            isNew       :isNew,
            inGuarantee :inGuarantee,
            city        :city,
            price       :price
        };

        console.log(newProduct);



        this.model.postProduct(newProduct,
            function(obj){
                var timeAndId = obj;
                addProductToDom(newProduct,timeAndId);


                console.log('ADDED PRODUCT');
            },
            function(obj){
                console.log(obj);
                console.log('error');
            }
        )
    };



    ViewModel.prototype.delete = function(id){

        this.model.deleteProduct(id,
            function(obj){
                console.log('DELETE');
                console.log(obj);
            },
            function(error){
                console.log(error.responseText);
                console.log('ne se trie');
            })

    };


    function addProductToDom(product,timeAndId){

        var product = product;
        console.log('in function')
        console.log(product)


        var paragraphs = [];

        var productWrapper = $('<div>');
        var ownerNameP     = $('<p>');
        var ownerPhoneP    = $('<p>');
        var productNameP   = $('<p>');
        var isNewP         = $('<p>');
        var inGuaranteeP   = $('<p>');
        var cityP          = $('<p>');
        var priceP         = $('<p>');
        var createdAtP     = $('<p>');
        paragraphs.push(ownerNameP);
        paragraphs.push(ownerPhoneP);
        paragraphs.push(productNameP);
        paragraphs.push(isNewP);
        paragraphs.push(inGuaranteeP);
        paragraphs.push(cityP);
        paragraphs.push(priceP);
        paragraphs.push(createdAtP);
        var btn = $('<button id="buy">Add ot <span class="glyphicon glyphicon-shopping-cart"></span></button>');





        var valOwnerName    = product.ownerName + '';
        var valOwnerPhone   = Number(product.ownerPhone);
        var valProductName  = product.productName + '';
        var valIsNew        = product.isNew       == 'on' || true ? 'Yes' : 'No';
        var valInGuarantee  = product.inGuarantee == 'on' || true ? 'Yes' : 'No';
        var valCity         = product.city + '';
        var valPrise        = Number(product.price);
        var prID            = product.objectId ? product.objectId : timeAndId.objectId;
        var createdAt       = product.createdAt ? product.createdAt : timeAndId.createdAt;   /// !!!

        console.log(prID + ' this is ID');
        console.log(createdAt + ' this is TIME');

        productWrapper.addClass('productWrapper');

        ownerNameP  .text('owner: ' + valOwnerName);
        ownerPhoneP .text('phone: ' + valOwnerPhone);
        productNameP.text('product: ' + valProductName);
        isNewP      .text('new: ' + valIsNew);
        inGuaranteeP.text('guarantee: ' + valInGuarantee);
        cityP       .text('city: ' + valCity);
        priceP      .text('prise: ' + valPrise);
        createdAtP  .text('added in: ' + createdAt);

        productWrapper.attr('data-id',  prID);


        for (var i = 0; i < paragraphs.length; i++){
            paragraphs[i].addClass('productInfo');
            paragraphs[i].appendTo(productWrapper);
        }


        btn.appendTo(productWrapper);

        btn.click(function(e){

            var currentID = e.target.parentNode.getAttribute("data-id"); // opravi go !

            app.viewModel.products.boughtProducts.push(e.target);     /// trqbva da se prihvane obekta i da se dobavi v masiva !!!!!
            console.log(app.viewModel.products.boughtProducts);


            app.viewModel.products.delete(prID);



        });


        productWrapper.appendTo('#productContainer');
    }

    return {
        loadView : function(model){
            return new ViewModel(model);
        }
    }



})();



