package com.ecommerce.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    // List of cart item IDs to convert into an order
    @NotEmpty(message = "Order must have at least one item")
    private List<Long> cartIds;
}
