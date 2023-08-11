<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\PedidoCollection;
use App\Models\PedidoProducto;
class PedidoController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new PedidoCollection(Pedido::with('user')->with('productos')->where('estado', 0)-> get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Almacenar el Pedido
        $pedido  = new Pedido;
        $pedido -> user_id = Auth::id();
        $pedido -> total = $request -> total;
        $pedido -> save();

        // Obtener el ID del pedido actual
        $id = $pedido -> id;

        // Obtenr los productos
        $productos = $request-> productos;

        // Formatear un arreglo
        $pedido_producto = [];

        foreach($productos as $producto ){
            $pedido_producto[] = [
                'pedido_id'   => $id,
                'producto_id' => $producto['id'],
                'cantidad'    => $producto['cantidad'],
                'created_at'  => Carbon::now(),
                'updated_at'  => Carbon::now(),
            ] ;
        }

        // almacenar en la BD
        PedidoProducto::insert($pedido_producto);

        return [
            'message' => 'Pedido Realizado, estará listo en unos minutos'
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(Pedido $pedido)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pedido $pedido)
    {
        $pedido -> estado = 1;
        $pedido -> save();
        return ['pedido' => $pedido];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pedido $pedido)
    {
        //
    }
}
