package com.trafigura.teaderapp.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Position {
    private String securityCode;
    private Integer quantity;
}
